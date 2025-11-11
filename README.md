# Shared Element Transition Experiment

Attempt at mimicking the transitions found on the "Today" section at the Apple's App Store.

```tsx
<SharedDialog>
  <SharedDialogTrigger>
    {/* Must wrap clickable elements in a propagation safe component */}
    <GenericUI />
  </SharedDialogTrigger>
  <SharedDialogContent>
    <GenericContent />
  </SharedDialogContent>
</SharedDialog>
```
