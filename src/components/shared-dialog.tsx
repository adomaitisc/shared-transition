import { Dialog } from "radix-ui";
import { useSpring, animated } from "@react-spring/web";
import { cloneElement, useState, useCallback, useEffect } from "react";

const MAX_WIDTH = 768; // Maximum width for the dialog

export function SharedDialog({
  sharedContent,
  children: extendedContent,
}: {
  sharedContent: React.ReactElement;
  children: React.ReactElement;
}) {
  // We must clone the children instead of using them directly twice
  const clonedContent = cloneElement(sharedContent);

  const [clientBounds, setClientBounds] = useState<DOMRect | null>(null);

  // A single spring for all animaitng elements
  const [{ opacity, borderRadius, scale, width, height, top, left }, api] =
    useSpring(() => ({
      opacity: 0,
      borderRadius: 10,
      scale: 1,
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      config: { tension: 190, friction: 24, clamp: false },
    }));

  function closeSpring(spring: typeof api) {
    if (!clientBounds) return;
    spring.start({
      opacity: 0,
      borderRadius: 10,
      width: clientBounds.width,
      height: clientBounds.height,
      top: clientBounds.top,
      left: clientBounds.left,
      // config: { clamp: true },
      onResolve: () => {
        setClientBounds(null);
      },
    });
  }

  const initializeSpringCallback = useCallback(
    (bounds: DOMRect, spring: typeof api) => {
      spring.set({
        borderRadius: 10,
        width: bounds.width,
        height: bounds.height,
        top: bounds.top,
        left: bounds.left,
      });
    },
    []
  );

  const openSpringCallback = useCallback((spring: typeof api) => {
    const windowWidth = window.innerWidth;
    spring.start({
      opacity: 1,
      borderRadius: windowWidth > MAX_WIDTH ? 10 : 0, // Rounded corners on larger screens
      scale: 1,
      width: windowWidth > MAX_WIDTH ? MAX_WIDTH : windowWidth, // Full screen width
      height: window.innerHeight - (windowWidth > MAX_WIDTH ? 96 : 0), // Full screen height minus bottom padding on larger screens
      top: windowWidth > MAX_WIDTH ? 64 : 0,
      left: windowWidth > MAX_WIDTH ? windowWidth / 2 - MAX_WIDTH / 2 : 0, // Center horizontally if screen is wider than 768px
    });
  }, []);

  useEffect(() => {
    if (clientBounds) {
      initializeSpringCallback(clientBounds, api);
      openSpringCallback(api);
    }
  }, [clientBounds, api, initializeSpringCallback, openSpringCallback]);

  return (
    <Dialog.Root open={!!clientBounds}>
      <Dialog.Trigger
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
        className="w-[90vw] snap-center shrink-0 max-w-lg h-[402px] relative border-[1px] border-black select-none aria-hidden:opacity-0 border-none"
      >
        <animated.div
          className="h-full w-full overflow-hidden"
          style={{
            scale,
            borderRadius,
          }}
        >
          {sharedContent}
        </animated.div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          asChild
          onClick={(e) => {
            e.preventDefault();
            closeSpring(api);
          }}
        >
          <animated.div
            style={{
              opacity,
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          />
        </Dialog.Overlay>

        <Dialog.Content
          onCloseAutoFocus={(e) =>
            window.innerWidth < MAX_WIDTH ? e.preventDefault() : null
          }
          onOpenAutoFocus={(e) =>
            window.innerWidth < MAX_WIDTH ? e.preventDefault() : null
          }
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            closeSpring(api);
          }}
        >
          <animated.div
            className="fixed bg-[#1c1c1d] overflow-y-auto shadow-xl overflow-x-hidden opacity-100 z-20 select-none"
            style={{
              width,
              height,
              top,
              left,
              scale,
              borderRadius,
              transformOrigin: "center center",
            }}
          >
            <Dialog.Close
              onClick={(e) => {
                e.preventDefault();
                closeSpring(api);
              }}
              className="absolute top-0 right-0 p-4 z-10"
            >
              <animated.div
                style={{ opacity }}
                className="bg-black/20 size-8 rounded-full rotate-45"
              >
                <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
              </animated.div>
            </Dialog.Close>
            <button
              onClick={(e) => {
                e.preventDefault();
                closeSpring(api);
              }}
              onTouchStart={() => {
                api.start({ scale: 0.9, borderRadius: 16 });
              }}
              onTouchEnd={() => {
                api.start({ scale: 1, borderRadius: 0 });
              }}
              onTouchMove={() => {
                api.start({ scale: 1, borderRadius: 0 });
              }}
              className="shrink-0 w-full h-full max-h-[402px] group shadow-2xl"
            >
              {clonedContent}
            </button>
            <animated.div
              style={{
                paddingBottom: window.innerWidth > MAX_WIDTH ? 96 : 0,
                opacity,
                width:
                  window.innerWidth > MAX_WIDTH ? MAX_WIDTH : window.innerWidth,
              }}
              className="px-5 py-3"
            >
              {extendedContent}
            </animated.div>
          </animated.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
