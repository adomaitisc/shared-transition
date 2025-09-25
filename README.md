# Shared Element Transition Experiment

Attempt at mimicking the transitions found on the "Today" section at the Apple's App Store.

## Demo

![Slow-mo GIF](https://github.com/adomaitisc/shared-transition/blob/main/demo.gif)

## Deployment

`git clone "the repo"` > `npm install` > `npm run dev`

## Usage

I tried used a context provider and a custom hook to manage the state of the transition, it is messy but somehow it "works". Scrolling is an important part of this experiment, so the CSS structure of the `html` and `body` elements is important.
