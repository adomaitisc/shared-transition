import "./index.css";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SharedUI, ExpandedContent } from "./components/";

export default function App() {
  const originalScale = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [overscrollStartY, setOverscrollStartY] = useState(0);
  const [activeOverlay, setActiveOverlay] = useState<number | null>(null);
  const [initialPosition, setInitialPosition] = useState<{
    id: number | null;
    y: number | null;
  }>({
    id: null,
    y: null,
  });

  function enableOverlay(event: React.MouseEvent) {
    const target = event.currentTarget as HTMLElement;

    const rect = target.getBoundingClientRect();
    const y = rect.top + window.scrollY;

    setInitialPosition({ id: parseInt(target.id), y });

    const overlayLayer = document.getElementById("overlay-layer");
    if (overlayLayer) {
      overlayLayer.classList.remove("pointer-events-none");
      overlayLayer.classList.add("pointer-events-auto");

      setActiveOverlay(parseInt(target.id));
    }
  }

  function disableOverlay() {
    const overlayLayer = document.getElementById("overlay-layer");

    if (overlayLayer) {
      overlayLayer.classList.remove("pointer-events-auto");
      overlayLayer.classList.add("pointer-events-none");

      setActiveOverlay(null);
    }
  }

  return (
    <div className={`relative h-[100svh] bg-black overflow-auto`}>
      {/* Overlay layer, initially hidden */}
      <div
        id="overlay-layer"
        className="fixed inset-0 pointer-events-none z-10"
      >
        {/* Render animated UI here */}
        <AnimatePresence
          onExitComplete={() => {
            // Reset the initial position when the overlay is closed
            setInitialPosition({ id: null, y: null });
          }}
        >
          {activeOverlay !== null && (
            <>
              {/* Blur overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute top-0 left-0 w-full h-screen bg-black/60 backdrop-blur-xl"
              />

              {/* Animated UI (Watch the position) */}
              <motion.div
                initial={{
                  width: "90%",
                  // height: "402px",
                  y: initialPosition.y ?? 0,
                }}
                animate={{
                  width: "100%",
                  // height: "100%",
                  y: 0,
                }}
                exit={{
                  width: "90%",
                  // height: "402px",
                  y: initialPosition.y ?? 0,
                }}
                transition={{ duration: 0.25 }}
                className="absolute top-0 left-1/2 bg-amber-300 -translate-x-1/2 h-full w-full overflow-hidden"
              >
                {/* Content handles scrolling and exiting */}
                <motion.div
                  id="overlay-content"
                  initial={{ height: "402px" }}
                  animate={{ height: "100%" }}
                  exit={{
                    height: "402px",
                    scale: [
                      originalScale.current ? originalScale.current : 0.9,
                      1,
                    ],
                  }}
                  transition={{ duration: 0.25 }}
                  onScroll={(event) => {
                    // if we are at the top-ish of the scroll, we want to make sure
                    // overscroll WILL NOT bounce in our attemp to exit
                    if (event.currentTarget.scrollTop < 300) {
                      event.currentTarget.style.overscrollBehaviorY = "none";
                    } else {
                      event.currentTarget.style.overscrollBehaviorY = "contain";
                    }
                  }}
                  onTouchStart={(e) => {
                    // records the initial touch position to process later
                    if (e.currentTarget) {
                      setOverscrollStartY(e.touches[0].clientY);
                    }
                  }}
                  onTouchMove={(e) => {
                    // uses the overscrollStartY to calculate the deltaY if we
                    // are at the top of the scroll area and adjust the scale
                    // while triggering the exit animation
                    if (e.currentTarget.scrollTop < 10) {
                      const touchY = e.touches[0].clientY;
                      const deltaY = touchY - overscrollStartY;

                      const overlayContent =
                        document.getElementById("overlay-content");

                      if (overlayContent && deltaY > 0) {
                        if (animationFrameId.current) {
                          cancelAnimationFrame(animationFrameId.current);
                        }

                        // we use requestAnimationFrame to make the animation smoother
                        // and to avoid the scroll event to trigger too many times
                        // and cause a performance issue
                        animationFrameId.current = requestAnimationFrame(() => {
                          // make the scale deltaY get almost exponential
                          const scale = 1 - deltaY / 600;
                          // const scale = 1 - deltaY / 600;
                          originalScale.current = scale;

                          // border radius should be from 0 to 16px as delta grows
                          const borderRadius = Math.max(
                            0,
                            Math.min(16, (deltaY / 60) * 16)
                          );
                          overlayContent.style.borderRadius = `${borderRadius}px`;
                          overlayContent.style.transform = `scale(${scale})`;
                        });
                      }

                      if (overlayContent && deltaY > 80) {
                        if (animationFrameId.current) {
                          cancelAnimationFrame(animationFrameId.current);
                        }
                        disableOverlay();
                        return;
                      }
                    }
                  }}
                  onTouchEnd={() => {
                    // return to the original scale if it was not cancelled
                    if (animationFrameId.current) {
                      cancelAnimationFrame(animationFrameId.current);
                    }

                    const overlayContent =
                      document.getElementById("overlay-content");

                    if (!overlayContent) return;

                    if (originalScale.current && originalScale.current > 0.8) {
                      overlayContent.style.transform = `scale(1)`;
                      overlayContent.style.transition = "transform 0.25s";
                      overlayContent.style.borderRadius = `0px`;
                    } else {
                      overlayContent.style.transform = "";
                      overlayContent.style.transition = "";
                    }
                  }}
                  className="bg-[#1c1c1d] ring-1 ring-white/10 shadow-2xl z-20 select-none w-full relative overflow-x-hidden overscroll-auto"
                >
                  {/* Shared UI */}
                  <SharedUI
                    id={initialPosition.id ?? 0}
                    motionProps={{
                      initial: { borderRadius: "16px" },
                      animate: { borderRadius: "0px" },
                      exit: { borderRadius: "16px" },
                      transition: { duration: 0.25 },
                    }}
                  />

                  {/* Expanded Content */}
                  <ExpandedContent />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between w-full px-6 pt-3">
        <p className="text-4xl font-bold ">
          Today <span className="text-white/50 text-2xl px-0.5">24 May</span>
        </p>
        <div className="size-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-full" />
      </div>

      {/* List of elements */}
      <ul className="w-full flex flex-col gap-4 py-3 items-center">
        {Array.from({ length: 4 }, (_, i) => {
          return (
            <li
              key={i + 1}
              id={`${i + 1}`}
              onClick={enableOverlay}
              aria-selected={initialPosition.id === i + 1}
              className={`select-none h-[402px] w-[90%] aria-selected:opacity-0 group`}
            >
              {/* Shared UI */}
              <SharedUI
                id={i + 1}
                motionProps={{
                  initial: { borderRadius: "16px" },
                }}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
