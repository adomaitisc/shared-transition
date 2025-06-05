import {
  SharedTransitionContent,
  SharedTransitionOverlay,
  SharedTransitionProvider,
  SharedTransitionElement,
  SharedTransitionTrigger,
  GenericContent,
  GenericUI,
} from "./components";
import "./index.css";

export default function App() {
  return (
    <>
      <h1 className="text-2xl font-bold text-center pt-3 pb-6">
        Shared Transition Example
      </h1>
      <div className="flex flex-wrap justify-center items-center gap-6 bg-black overflow-hidden mb-8 px-5 py-2">
        {Array.from({ length: 30 }, (_, i) => (
          <SharedTransitionProvider key={i}>
            <SharedTransitionTrigger className="group pointer-events-auto w-full max-w-lg box-content">
              <SharedTransitionElement
                className="h-[420px] rounded-xl overflow-hidden pointer-events-none"
                sharedElementClassName="h-[420px]"
              >
                <GenericUI
                  id={i % 3}
                  superTitle="New Release"
                  title={<span>Lorem Ipsum</span>}
                  subTitle="The best in Latin literature"
                  app={{
                    name: "Lorem Explorer",
                    description: "Find Latin texts offline",
                    price: "$4.99",
                  }}
                />
              </SharedTransitionElement>
            </SharedTransitionTrigger>
            <SharedTransitionOverlay />
            <SharedTransitionContent>
              <GenericContent />
            </SharedTransitionContent>
          </SharedTransitionProvider>
        ))}
      </div>
    </>
  );
}
