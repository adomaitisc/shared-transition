import "./index.css";
import { GenericContent, GenericUI, SharedDialog } from "./components";

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
      <div className="grid lg:grid-cols-2 justify-center h-full items-center gap-4 bg-black p-4">
        <div className="col-span-full space-y-1.5 p-2">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-white text-4xl font-bold">
              Shared Transition Experiment
            </h1>
            <a
              href="https://github.com/adomaitisc/shared-transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repo"
              className="text-white/90 text-sm font-medium hover:underline"
            >
              GitHub Repo
            </a>
          </div>
          <p className="text-white/90 text-sm font-medium px-1">
            The purpose of this experiment was to replicate the transitions
            found on the "Today" section at the Apple's App Store.
          </p>
          <p className="text-white/90 text-sm font-medium px-1">
            Animations like these are really complex and they require a deeper
            thinking about layers and interactions in the UI.
          </p>
          <p className="text-white/90 text-sm font-medium px-1">
            There are known issues with screen height and scrolling on mobile
            devices.
          </p>
          <p className="text-white/90 text-sm font-medium px-1">
            The demo below showcases 2 cards with the same transition, images
            are copywrite free.
          </p>
        </div>

        {items.map((item, i) => (
          <SharedDialog
            key={i}
            sharedContent={
              <GenericUI
                image={item.image}
                iconImage={item.iconImage}
                superTitle={item.superTitle}
                title={item.title}
                subTitle={item.subTitle}
                app={{
                  name: item.app.name,
                  description: item.app.description,
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
