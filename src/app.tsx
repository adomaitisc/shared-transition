import {
  SharedDialog,
  SharedDialogContent,
  SharedDialogTrigger,
} from "./components/dialog";
import { GenericContent, GenericUI } from "./components/generic";
import "./index.css";

const items = [
  {
    superTitle: "Limited Time",
    title: "Jack in to Cyberpunk 2077",
    subTitle: "Experience the complete sci-fi epic. Including Phantom Liberty.",
    image:
      "https://images.unsplash.com/photo-1515036551567-bf1198cccc35?q=80&w=2676&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    iconImage:
      "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/6f6129cfefa0d2d15928b93659c0d80d_low_res_Cyberpunk_2077.png",
    app: {
      name: "Cyberpunk 2077: Ultimate",
      description: "Action Adventure RPG",
    },
  },
  {
    superTitle: "Showcase",
    title: "Play like Never Before",
    subTitle: "Customize Decks With The Witcher, Vampire Survivors and More",
    image:
      "https://images.unsplash.com/photo-1670085733981-c56e12ff7587?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    iconImage:
      "https://parsefiles.back4app.com/JPaQcFfEEQ1ePBxbf6wvzkPMEqKYHhPYv8boI1Rc/40c10f4e346531165eae8ac36669e479_low_res_Sequel_Ace__Dark_Mode_.png",
    app: {
      name: "Balatro+",
      description: "When Poker Meets Solitaire",
    },
  },
];

export default function App() {
  return (
    <div className="flex flex-col h-full py-10 gap-4 items-center justify-center min-h-screen">
      <div className="grid xl:grid-cols-2 justify-center h-full place-items-center gap-4 p-4">
        <div className="col-span-full space-y-1.5 p-2 w-[90vw] max-w-[512px] mr-auto">
          <a
            href="https://github.com/adomaitisc/shared-transition"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-sky-400 px-0.5 text-sm font-medium hover:underline"
          >
            GitHub
          </a>
          <h1 className="text-white text-3xl font-semibold">
            Shared Transition Experiment
          </h1>
          <div className="space-y-1.5 px-0.5">
            <p className="text-white/90 text-sm font-medium">
              Replica of transitions found on the "Today" section at the App
              Store.
            </p>
            <p className="text-white/90 text-sm font-medium">
              There are height issues on mobile devices, especially on Safari.
            </p>
            <p className="text-white/90 text-sm font-medium">
              Originally inspired by{" "}
              <a
                href="https://x.com/emilkowalski_/status/1762211373960900664"
                className="text-sky-400 text-sm font-medium hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                @emilkowalski_
              </a>
            </p>
          </div>
        </div>

        {items.map((item) => (
          <SharedDialog key={item.title}>
            <SharedDialogTrigger>
              {/* Must wrap clickable elements in a propagation safe component */}
              <GenericUI {...item} />
            </SharedDialogTrigger>
            <SharedDialogContent>
              <GenericContent />
            </SharedDialogContent>
          </SharedDialog>
        ))}
      </div>
    </div>
  );
}
