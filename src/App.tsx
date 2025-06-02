import "./index.css";
import V1 from "./v1/v1";
import V2 from "./v2/v2";
import { useState } from "react";

export default function App() {
  const [activeTab, _] = useState<"v1" | "v2">("v2");
  return (
    <>{activeTab === "v1" ? <V1 /> : <V2 />}</>
    // <div className="relative bg-black flex flex-row flex-wrap item-center justify-center gap-4 p-4 h-full overflow-hidden">
    //   {Array.from({ length: 100 }, (_, i) => (
    //     <SharedTransition key={i} expandable={<ExpandedContent />}>
    //       <SharedUI id={1} />
    //     </SharedTransition>
    //   ))}
    // </div>
  );
}
