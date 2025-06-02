import React, { useEffect, useRef, useState } from "react";
import { animated, to, useSpring } from "@react-spring/web";
import ReactDOM from "react-dom";
import { ExpandedContent, SharedUI } from "../components";

export default function V2() {
  return (
    <div className="relative bg-black flex flex-row flex-wrap item-center justify-center gap-4 p-4 h-full overflow-hidden">
      {Array.from({ length: 100 }, (_, i) => (
        <SharedTransition key={i} expandable={<ExpandedContent />}>
          <SharedUI id={1} />
        </SharedTransition>
      ))}
    </div>
  );
}

type Pos = { x: number; y: number; width: number; height: number };

export function SharedTransition({
  children,
  expandable,
}: {
  children: React.ReactNode;
  expandable: React.ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [cloneBounds, setCloneBounds] = useState<Pos | null>(null);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const fullscreenRef = useRef<HTMLDivElement | null>(null);

  const [{ x, y, scale, overlayOpacity, width, height, borderRadius }, api] =
    useSpring(() => ({
      x: 0,
      y: 0,
      scale: 1,
      overlayOpacity: 0,
      width: 0,
      height: 0,
      borderRadius: 10,
      config: { tension: 120, friction: 14, mass: 0.6, clamp: true },
    }));

  function handleClick() {
    if (!triggerRef.current) return;

    const rect = triggerRef.current.getBoundingClientRect();
    setCloneBounds({
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
    });

    api.set({
      width: rect.width,
      height: rect.height,
    });

    setVisible(true);
  }

  function handleClose() {
    if (!cloneBounds || !fullscreenRef.current) return;

    // This call hides the scrollbar when closing the fullscreen view.
    fullscreenRef.current.childNodes.forEach((node) => {
      if (node instanceof HTMLElement) {
        node.style.pointerEvents = "none";
        node.style.overflowY = "hidden";
      }
    });

    // this call resets the theme color meta tag when closing the fullscreen view.
    // const metaTag = document.querySelector(
    //   'meta[name="theme-color"]'
    // ) as HTMLMetaElement | null;
    // if (metaTag !== null) {
    //   metaTag.setAttribute("content", "#000000");
    // }

    api.start({
      x: 0,
      y: 0,
      scale: 1,
      overlayOpacity: 0,
      width: cloneBounds.width,
      height: cloneBounds.height,
      borderRadius: 10,
      onRest: () => {
        setVisible(false);
        document.body.style.overflow = "auto";
      },
    });
  }

  const portalContent = (
    <>
      <animated.div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 overscroll-contain"
        style={{ opacity: overlayOpacity }}
        onClick={handleClose}
      />

      <animated.div
        className="bg-gradient-to-b from-rose-500 via-rose-500 to-[#1c1c1d] overflow-hidden fixed z-50"
        ref={fullscreenRef}
        style={{
          top: cloneBounds?.y,
          left: cloneBounds?.x,
          width,
          height,
          borderRadius: borderRadius.to((r) => `${r}px`),
          transform: to([x, y, scale, width, height], (x, y, s, w, h) => {
            const initialW = cloneBounds?.width ?? w;
            const initialH = cloneBounds?.height ?? h;

            const dx = x - (w - initialW) / 2;
            const dy = y - (h - initialH) / 2;

            return `translate(${dx}px, ${dy}px) scale(${s})`;
          }),
        }}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
      >
        <div className="h-full w-full flex flex-col items-center justify-start overflow-x-hidden overscroll-contain">
          <div className="shrink-0 w-full">{children}</div>
          <animated.div
            style={{ opacity: overlayOpacity }}
            className="bg-[#1c1c1d]"
          >
            {expandable}
          </animated.div>
        </div>
      </animated.div>
    </>
  );

  useEffect(() => {
    if (!cloneBounds || !visible) return;

    const centerX =
      window.innerWidth / 2 - cloneBounds.x - cloneBounds.width / 2;
    const centerY =
      window.innerHeight / 2 - cloneBounds.y - cloneBounds.height / 2;

    api.start({
      x: centerX,
      y: centerY,
      scale: 1,
      width: Math.min(860, window.innerWidth),
      height: window.innerHeight,
      borderRadius: 0,
      overlayOpacity: 1,
      onRest: () => {
        // const metaTag = document.querySelector(
        //   'meta[name="theme-color"]'
        // ) as HTMLMetaElement | null;
        // if (metaTag !== null) {
        //   metaTag.setAttribute("content", "#FF2056");
        // }
      },
    });
  }, [api, cloneBounds, visible]);

  return (
    <>
      <div
        ref={triggerRef}
        onClick={handleClick}
        className={`inline-block cursor-pointer group ${
          visible ? "opacity-0" : ""
        }`}
      >
        <div className="rounded-[10px] overflow-hidden group-active:scale-95 duration-150">
          {children}
        </div>
      </div>

      {visible &&
        cloneBounds &&
        ReactDOM.createPortal(portalContent, document.getElementById("root")!)}
    </>
  );
}
