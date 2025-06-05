import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { animated, useSpring } from "@react-spring/web";
import ReactDOM from "react-dom";

interface ContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;

  childrenToRender: ReactNode;
  setChildrenToRender: (node: ReactNode) => void;

  startingRect: DOMRect | null;
  setStartingRect: (rect: DOMRect) => void;
}

const DialogContext = createContext<ContextProps | undefined>(undefined);

function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialogContext must be used within <DialogProvider>");
  }
  return ctx;
}

export function SharedTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const [childrenToRender, setChildrenToRender] = useState<ReactNode>(null);
  const [startingRect, setStartingRect] = useState<DOMRect | null>(null);

  const open = () => {
    setIsOpen(true);
  };
  const close = () => {
    setIsOpen(false);
  };

  return (
    <DialogContext.Provider
      value={{
        isOpen,
        open,
        close,
        childrenToRender,
        setChildrenToRender,
        startingRect,
        setStartingRect,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

export function SharedTransitionElement({
  children,
  className,
  sharedElementClassName = "",
}: {
  children: ReactNode;
  className?: string;
  sharedElementClassName?: string;
}) {
  const { setChildrenToRender, isOpen } = useDialogContext();
  const [debouncedOpacity, setDebouncedOpacity] = useState(1);

  useEffect(() => {
    if (isOpen) {
      setDebouncedOpacity(0);
    } else {
      const timeout = setTimeout(() => {
        setDebouncedOpacity(1);
      }, 300); // Match the duration of the closing animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  useEffect(() => {
    setChildrenToRender(
      <SharedTransitionTrigger
        className={`relative w-full select-none ${sharedElementClassName}`}
      >
        {children}
      </SharedTransitionTrigger>
    );
  }, [children, sharedElementClassName, setChildrenToRender]);

  return (
    <div
      style={{ opacity: debouncedOpacity }}
      className={`relative select-none pointer-events-none ${className}`}
    >
      {children}
    </div>
  );
}

export function SharedTransitionTrigger({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  const { open, close, isOpen, setStartingRect } = useDialogContext();

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    event.preventDefault();
    if (isOpen) {
      close();
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setStartingRect(rect);
      setTimeout(() => {
        if (
          rect.x !== 0 ||
          rect.y !== 0 ||
          rect.width !== 0 ||
          rect.height !== 0
        ) {
          open();
        }
      }, 1); // Small delay to ensure the overlay is visible
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
}

export function SharedTransitionContent({ children }: { children: ReactNode }) {
  const { isOpen, childrenToRender, startingRect } = useDialogContext();
  const portalRef = React.useRef<HTMLDivElement | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  const [{ top, left, width, height, opacity, borderRadius }, animate] =
    useSpring(() => ({
      top: 0,
      left: 0,
      width: 0,
      height: 0,
      opacity: 0,
      borderRadius: 10,
      config: { tension: 120, friction: 14, mass: 0.6, clamp: true },
    }));

  useEffect(() => {
    if (!startingRect) return;

    if (isOpen) {
      setShouldRender(true);
      // Opening: start from trigger rect → full screen
      setTimeout(() => {
        // Another segment of hacky setTimeouts
        portalRef.current?.focus();
        animate.set({
          top: startingRect.top,
          left: startingRect.left,
          width: startingRect.width,
          height: startingRect.height,
          borderRadius: 10,
          opacity: 0,
        });
        setTimeout(() => {
          animate.start({
            top: window.innerWidth > 768 ? 24 : 0,
            left: window.innerWidth > 768 ? window.innerWidth / 2 - 384 : 0,
            width: Math.min(window.innerWidth, 768),
            height: window.innerHeight,
            borderRadius: window.innerWidth > 768 ? 16 : 0,
            opacity: 1,
          });
        }, 1);
      }, 1);
    } else {
      if (!portalRef.current) return;
      portalRef.current.style.pointerEvents = "none"; // Turns out we need just _enough_ pointerEvents to make this smooth
      // Closing: animate back to trigger rect, then unmount
      animate.start({
        top: startingRect.top,
        left: startingRect.left,
        width: startingRect.width,
        height: startingRect.height,
        borderRadius: 10,
        opacity: 0,
        onResolve: () => {
          setShouldRender(false);
        },
      });
    }
  }, [isOpen, startingRect, animate, setShouldRender]);

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <animated.div
      ref={portalRef}
      style={{
        top,
        left,
        width,
        height,
        borderRadius,
      }}
      className="fixed z-50 shadow-2xl bg-[#1c1c1d] overflow-y-auto overscroll-y-contain overflow-x-hidden"
    >
      {childrenToRender}
      <animated.div
        style={{ opacity }}
        className="w-screen max-w-3xl h-full bg-[#1c1c1d]"
      >
        {children}
      </animated.div>
    </animated.div>,
    document.getElementById("root")!
  );
}

export function SharedTransitionOverlay() {
  const [shouldShow, setShouldShow] = useState(false); // Feels weird and hacky as well
  const { isOpen, close } = useDialogContext();

  const [{ opacity }, animateOverlay] = useSpring(() => ({
    opacity: 0,
    config: { tension: 120, friction: 14, mass: 0.6, clamp: true },
  }));

  useEffect(() => {
    if (isOpen) {
      setShouldShow(true);
      setTimeout(() => {
        // Hacky setTimeout because it works
        animateOverlay.start({ opacity: 1 });
      }, 1);
    } else {
      animateOverlay.start({
        opacity: 0,
        onResolve: () => {
          setShouldShow(false);
        },
      });
    }
  }, [isOpen, animateOverlay, setShouldShow]);

  return shouldShow
    ? ReactDOM.createPortal(
        <animated.div
          onClick={close}
          style={{
            opacity,
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />,
        document.getElementById("root")!
      )
    : null;
}
