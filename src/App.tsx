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
      <div className="flex justify-between max-w-lg mx-auto items-center py-2 px-5">
        <h1 className="text-2xl font-bold text-left">
          Shared Transition Example
        </h1>
        <a
          href="https://github.com/adomaitisc/shared-transition"
          className="bg-white-500 grid place-items-center rounded-full size-8"
        >
          <svg
            height="32"
            aria-hidden="true"
            viewBox="0 0 24 24"
            version="1.1"
            width="32"
            data-view-component="true"
            fill="#ffffff"
          >
            <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
          </svg>
        </a>
      </div>
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
