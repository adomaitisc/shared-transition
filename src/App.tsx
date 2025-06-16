import "./index.css";
import { GenericContent, GenericUI } from "./components";
import { SharedDialog } from "./components";

export default function App() {
  return (
    <div className="flex flex-col h-full py-10 gap-4 items-center justify-center">
      <div className="flex flex-wrap justify-center h-full items-center gap-4 bg-black">
        {Array.from({ length: 40 }, (_, i) => (
          <SharedDialog
            key={i}
            sharedContent={
              <GenericUI
                id={i % 3}
                superTitle="New Release"
                title={<span>Water Juice</span>}
                subTitle="Did you spill it?"
                app={{
                  name: "Water Juice",
                  description: "A Dog Company Product",
                }}
              />
            }
          >
            <GenericContent />
          </SharedDialog>
        ))}
      </div>
    </div>
  );
}
