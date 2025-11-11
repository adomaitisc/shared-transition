import { Dialog as DialogPrimitive } from "radix-ui";
import { useSpring, animated, SpringValue, SpringRef } from "@react-spring/web";
import {
  cloneElement,
  useState,
  useCallback,
  useEffect,
  createContext,
  useContext,
} from "react";

const MAX_WIDTH = 768; // Maximum width for the dialog

// Context types
interface SharedDialogContextValue {
  springState: {
    opacity: SpringValue<number>;
    borderRadius: SpringValue<number>;
    scale: SpringValue<number>;
    width: SpringValue<number>;
    height: SpringValue<number>;
    top: SpringValue<number>;
    left: SpringValue<number>;
  };
  api: SpringRef<{
    opacity: number;
    borderRadius: number;
    scale: number;
    width: number;
    height: number;
    top: number;
    left: number;
  }>;
  clientBounds: DOMRect | null;
  setClientBounds: (bounds: DOMRect | null) => void;
  clonedContent: React.ReactElement | null;
  setClonedContent: (content: React.ReactElement | null) => void;
  open: boolean;
  closeSpring: () => void;
}

// Create context
const SharedDialogContext = createContext<SharedDialogContextValue | null>(
  null
);

// Hook to use the context
function useSharedDialogContext() {
  const context = useContext(SharedDialogContext);
  if (!context) {
    throw new Error("useSharedDialogContext must be used within SharedDialog");
  }
  return context;
}

// Hook to access spring state and API
function useSharedDialogSpring() {
  const { springState, api, closeSpring } = useSharedDialogContext();
  return [springState, api, closeSpring] as const;
}

// Hook to access client bounds state
function useSharedDialogState() {
  const { clientBounds, setClientBounds } = useSharedDialogContext();
  return [clientBounds, setClientBounds] as const;
}

export function SharedDialog({ children }: { children: React.ReactElement[] }) {
  const [open, setOpen] = useState(false);
  const [clientBounds, setClientBounds] = useState<DOMRect | null>(null);
  const [clonedContent, setClonedContent] = useState<React.ReactElement | null>(
    null
  );

  // A single spring for all animaitng elements
  const [springState, api] = useSpring(() => ({
    opacity: 0,
    borderRadius: 10,
    scale: 1,
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    config: { tension: 190, friction: 24, clamp: false },
  }));

  const closeSpring = useCallback(() => {
    if (!clientBounds) return;
    api.start({
      opacity: 0,
      borderRadius: 10,
      width: clientBounds.width,
      height: clientBounds.height,
      top: clientBounds.top,
      left: clientBounds.left,
      // config: { clamp: true },
      onResolve: () => {
        setOpen(false);
        setClientBounds(null);
      },
    });
  }, [clientBounds, api, setOpen]);

  const initializeSpringCallback = useCallback(
    (bounds: DOMRect) => {
      api.set({
        borderRadius: 10,
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left,
      });
    },
    [api]
  );

  const openSpringCallback = useCallback(() => {
    const windowWidth = window.innerWidth;
    api.start({
      opacity: 1,
      borderRadius: windowWidth > MAX_WIDTH ? 10 : 0, // Rounded corners on larger screens
      scale: 1,
      width: windowWidth > MAX_WIDTH ? MAX_WIDTH : windowWidth, // Full screen width
      height: window.innerHeight - (windowWidth > MAX_WIDTH ? 96 : 0), // Full screen height minus bottom padding on larger screens
      top: windowWidth > MAX_WIDTH ? 64 : 0,
      left: windowWidth > MAX_WIDTH ? windowWidth / 2 - MAX_WIDTH / 2 : 0, // Center horizontally if screen is wider than 768px
    });
  }, [api]);

  useEffect(() => {
    if (clientBounds) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";

      initializeSpringCallback(clientBounds);
      openSpringCallback();
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [clientBounds, initializeSpringCallback, openSpringCallback]);

  const contextValue: SharedDialogContextValue = {
    springState,
    api,
    clientBounds,
    setClientBounds,
    clonedContent,
    setClonedContent,
    closeSpring,
    open,
  };

  return (
    <SharedDialogContext.Provider value={contextValue}>
      <DialogPrimitive.Root open={!!clientBounds} onOpenChange={setOpen}>
        {children}
      </DialogPrimitive.Root>
    </SharedDialogContext.Provider>
  );
}

export function SharedDialogTrigger({
  children,
}: {
  children: React.ReactElement;
}) {
  const [springState, api] = useSharedDialogSpring();
  const [clientBounds, setClientBounds] = useSharedDialogState();
  const { setClonedContent } = useSharedDialogContext();

  const setClonedContentCallback = useCallback(() => {
    const clonedContent = cloneElement(children);
    setClonedContent(clonedContent);
  }, [children, setClonedContent]);

  useEffect(() => {
    setClonedContentCallback();
  }, [setClonedContentCallback]);

  return (
    <DialogPrimitive.Trigger
      onTouchStart={() => {
        api.start({ scale: 0.95 });
      }}
      onTouchEnd={() => {
        api.start({ scale: 1 });
      }}
      onTouchMove={() => {
        api.start({ scale: 1 });
      }}
      onClick={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        setClientBounds(bounds);
      }}
      aria-hidden={!!clientBounds}
      className="w-[90vw] snap-center shrink-0 max-w-lg h-[402px] relative border-[1px] border-black select-none aria-hidden:opacity-0 aria-hidden:pointer-events-none border-none"
    >
      <animated.div
        className="h-full w-full overflow-hidden"
        style={{
          scale: springState.scale,
          borderRadius: springState.borderRadius,
        }}
      >
        {children}
      </animated.div>
    </DialogPrimitive.Trigger>
  );
}

export function SharedDialogContent({
  children,
}: {
  children: React.ReactElement;
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [springState, api, closeSpring] = useSharedDialogSpring();
  const { clonedContent } = useSharedDialogContext();

  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay asChild>
        <animated.div
          style={{
            opacity: springState.opacity,
          }}
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
        />
      </DialogPrimitive.Overlay>
      <DialogPrimitive.Content
        onInteractOutside={(e) => {
          e.preventDefault();
          closeSpring();
        }}
        onEscapeKeyDown={(e) => {
          e.preventDefault();
          closeSpring();
        }}
      >
        <animated.div
          className="fixed bg-[#1c1c1d] max-h-screen overflow-y-scroll shadow-xl overflow-x-hidden opacity-100 z-20 select-none"
          style={{
            width: springState.width,
            height: springState.height,
            top: springState.top,
            left: springState.left,
            scale: springState.scale,
            borderRadius: springState.borderRadius,
            transformOrigin: "center center",
          }}
        >
          <DialogPrimitive.Close
            onClick={(e) => {
              e.preventDefault();
              closeSpring();
            }}
            className="absolute top-0 right-0 p-4 z-10"
          >
            <animated.div
              style={{
                opacity: springState.opacity,
              }}
              className="bg-black/20 size-8 rounded-full rotate-45"
            >
              <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
            </animated.div>
          </DialogPrimitive.Close>
          <div className="shrink-0 w-full h-full max-h-[402px] group shadow-2xl">
            {clonedContent}
          </div>
          <animated.div
            style={{
              opacity: springState.opacity,
              width:
                window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth,
            }}
            className="px-5 py-3"
          >
            {children}
          </animated.div>
        </animated.div>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
}
