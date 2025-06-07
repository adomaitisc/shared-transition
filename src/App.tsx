import { Dialog } from "radix-ui";
import "./index.css";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { GenericContent, GenericUI } from "./components";

export default function App() {
  return (
    <div className="flex flex-col py-10 items-center justify-center">
      <div className="flex flex-wrap justify-center items-center gap-4 bg-black">
        {Array.from({ length: 40 }, (_, i) => (
          <Dialogger key={i}>
            <GenericUI
              id={i % 3}
              superTitle="Look"
              title={<span>WaterJuice</span>}
              subTitle="Aha!"
              app={{
                name: "WaterJuice",
                description: "Yaaaa",
              }}
            />
          </Dialogger>
        ))}
      </div>
    </div>
  );
}

function Dialogger({ children: sharedElement }: { children: React.ReactNode }) {
  const [clientBounds, setClientBounds] = useState<DOMRect | null>(null);

  function closeDialog() {
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
        setClientBounds(null);
      },
    });
  }

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

  useEffect(() => {
    if (clientBounds) {
      api.set({
        borderRadius: 10,
        width: clientBounds.width,
        height: clientBounds.height,
        top: clientBounds.top,
        left: clientBounds.left,
      });
      api.start({
        opacity: 1,
        scale: 1,
        borderRadius: window.innerWidth > 768 ? 16 : 0,
        width: Math.min(window.innerWidth, 768), // Full screen width
        height: window.innerHeight, // Full screen height
        top: window.innerWidth > 768 ? 64 : 0, // Center vertically
        left: window.innerWidth > 768 ? innerWidth / 2 - 768 / 2 : 0, // Center horizontally if screen is wider than 768px
      });
    }
  }, [clientBounds, api]);

  return (
    <Dialog.Root open={clientBounds !== null}>
      <Dialog.Trigger
        onMouseDown={(e) => {
          // Prevent default to avoid text selection
          e.preventDefault();
          e.stopPropagation();

          api.start({ scale: 0.95 });
        }}
        onTouchStart={(e) => {
          // Prevent default to avoid text selection
          e.preventDefault();
          e.stopPropagation();

          api.start({ scale: 0.95 });
        }}
        onTouchMove={() => {
          api.start({ scale: 1 });
        }}
        onMouseLeave={() => {
          api.start({ scale: 1 });
        }}
        onClick={(e) => {
          console.log(e.currentTarget.getBoundingClientRect());
          setClientBounds(e.currentTarget.getBoundingClientRect());
        }}
        aria-hidden={clientBounds !== null}
        className="w-[90%] max-w-lg h-[402px] overflow-hidden relative border-[1px] border-black select-none aria-hidden:opacity-0 border-none"
      >
        <animated.div
          className="h-full w-full overflow-hidden"
          style={{
            scale,
            borderRadius,
          }}
        >
          {sharedElement}
        </animated.div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay asChild onClick={closeDialog}>
          <animated.div
            style={{
              opacity,
            }}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-10"
          />
        </Dialog.Overlay>

        <Dialog.Content
          onCloseAutoFocus={(e) =>
            window.innerWidth < 768 ? e.preventDefault() : null
          }
          onEscapeKeyDown={(e) => {
            e.preventDefault();
            closeDialog();
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
              onClick={closeDialog}
              className="absolute top-2 right-2 z-10"
            >
              <animated.button
                style={{ opacity }}
                className="bg-white/30 size-8 rounded-full rotate-45"
              >
                <div className="absolute top-1/2 left-1/2 w-4 h-[2px] bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
                <div className="absolute top-1/2 left-1/2 w-[2px] h-4 bg-white transform -translate-x-1/2 -translate-y-1/2 rounded-full" />
              </animated.button>
            </Dialog.Close>
            <button
              onClick={closeDialog}
              onTouchStart={(e) => {
                // Prevent default to avoid text selection
                e.preventDefault();
                e.stopPropagation();

                api.start({ scale: 0.9, borderRadius: 16 });
              }}
              onTouchEnd={() => {
                api.start({ scale: 1, borderRadius: 0 });
              }}
              onTouchMove={() => {
                api.start({ scale: 1, borderRadius: 0 });
              }}
              onMouseDown={(e) => {
                // Prevent default to avoid text selection
                e.preventDefault();
                e.stopPropagation();
                api.start({ scale: 0.9 });
              }}
              onMouseLeave={() => {
                api.start({ scale: 1 });
              }}
              onMouseUp={() => {
                api.start({ scale: 1 });
              }}
              className="shrink-0 w-full h-full max-h-[402px] group shadow-2xl"
            >
              {sharedElement}
            </button>
            <animated.div
              style={{
                paddingBottom: window.innerWidth > 768 ? 96 : 0,
                opacity,
                width: window.innerWidth > 768 ? 768 : window.innerWidth,
              }}
              className="px-5 py-3"
            >
              <GenericContent />
            </animated.div>
          </animated.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
