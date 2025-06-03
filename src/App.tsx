import { ExpandedContent, SharedUI } from "./components";
import "./index.css";
import {
  Content,
  Overlay,
  Provider,
  SharedElement,
  Trigger,
} from "./v3/shared-transition";

export default function App() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center my-8">
        Shared Transition Example
      </h1>
      <div className="flex flex-wrap justify-center items-center overflow-hidden gap-6 mb-8">
        {Array.from({ length: 30 }, (_, i) => (
          <Provider key={i}>
            <Trigger className="group pointer-events-auto">
              <SharedElement
                className="h-[420px] rounded-xl overflow-hidden pointer-events-none group-active:scale-95 duration-300 ease-out"
                sharedElementClassName="h-[420px]"
              >
                <SharedUI id={i % 3} />
              </SharedElement>
            </Trigger>
            <Overlay />
            <Content>
              <ExpandedContent />
            </Content>
          </Provider>
        ))}
      </div>
    </>
  );
}
