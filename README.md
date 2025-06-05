# Shared Element Transition Experiment

Attempt at mimicking the transitions found on the "Today" section at the Apple's App Store.

## Usage

I tried used a context provider and a custom hook to manage the state of the transition, it is messy but somehow it "works". Scrolling is an important part of this experiment, so the CSS structure of the `html` and `body` elements is important.

```jsx
<SharedTransitionProvider>
  <SharedTransitionTrigger className="pointer-events-auto w-full max-w-xl">
    {" "}
    {/* We don't want to share the trigger element */}
    <SharedTransitionElement
      className="h-[420px] rounded-xl overflow-hidden pointer-events-none"
      sharedElementClassName="h-[420px]"
    >
      {/* Whatever UI will be shared */}
    </SharedTransitionElement>
  </SharedTransitionTrigger>
  <SharedTransitionOverlay /> {/* This is the overlay that will be shown during the transition */}
  <SharedTransitionContent>
    {/* The content that will be the "expanded" content */}
  </SharedTransitionContent>
</SharedTransitionProvider>
```

## Deployment

`git clone "the repo"` > `npm install` > `npm run dev`
