---
title: "Bouncing ball with CSS keyframes (Bonus: Impact effect & Bezier curves)"
date: 2019-04-16
tags: [CSS, keyframes, bezier curves, flex layout]
excerpt: "This project simulates a ball falling from a height. In order to make the animation more realistic, I showed the shape change at the moment of impact and the decreasing height due to friction."
---

Here is the [demo](https://alitursucular.github.io/bouncing-ball-with-CSS-keyframes-demo/) and [GitHub repository](https://github.com/alitursucular/bouncing-ball-with-CSS-keyframes-demo).

This project simulates a ball falling from a height. In order to make the animation more realistic, I showed the shape change at the moment of impact and the decreasing height due to friction.

The _@keyframes_ CSS at-rule controls the intermediate steps in a CSS animation sequence by defining styles for keyframes (or waypoints) along the animation sequence. This gives more control over the intermediate steps of the animation sequence than transitions.<sup>1</sup>

As it is mentioned in the above decleration, CSS @keyframes gives us flexibility over the animation. The basic logic is that you have an animation planned and want to control intermediate steps. To do that, we first need to add _aanimation-name_ property to be used by its keyframe decleration:

```css
.ball {
  border-radius: 50%;
  position: fixed;
  width: 120px;
  height: 120px;
  top: 0%;
  animation-name: bounce;
  animation-duration: 6s;
  animation-iteration-count: 1;
  animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1); /* Ease-in-out */
}
```

As you notice, there are several more animation properties added. Since I needed to achieve bouncing effect, I preferred _Ease-in-out_ transition. Rather than simply writing _animation-timing-function: Ease-in-out;_, I preferred _cubic-bezier_ notaition so I could be more flexible on the behavior of the curve. Moreover, _animation-duration_ defines how long the animation cycle should take. Lastly, the number of times that an animation cycle is played before it stops is specified by _animation-iteration-count_ property.

```css
@keyframes bounce {
  ...;
}
```

The above decleration makes the magic. We write keyframe percantages in it and define elements in those percentages. Keyframe percentages can be listed regardless of its order. They will be handled in the order they should occur. So the below code block is our bouncing ball:

```css
@keyframes bounce {
  8% {
    /* Use the first 8% of duration time to 
    reach bottom which, will be a quick fall */
    top: 70%;
    width: 160px;
    height: 100px;
  }
  18% {
    top: 20%;
    width: 120px;
    height: 120px;
  }

  28% {
    top: 70%;
    width: 145px;
    height: 105px;
  }
  39% {
    top: 35%;
    width: 120px;
    height: 120px;
  }
  48% {
    top: 70%;
    width: 130px;
    height: 110px;
  }

  55% {
    top: 55%;
    width: 120px;
    height: 120px;
  }
  62% {
    top: 70%;
    width: 125px;
    height: 115px;
  }
  69% {
    top: 64%;
    width: 120px;
    height: 120px;
  }
  75% {
    top: 70%;
  }
  80% {
    top: 68%;
  }
  84% {
    top: 70%;
  }
  100% {
    top: 70%;
  }
}
```

After going through trial and error steps, I achieved the effect that satisfies me. As you notice, _top_ element is changed throughout the duration in order to simulate the bounce. In addition to that, _width_ and _height_ elements of the ball class are also changed to mimic the impact effect.

This is all for this project, thanks for reading! I would be very pleased if you could share your thoughts.

Here is the [demo](https://alitursucular.github.io/bouncing-ball-with-CSS-keyframes-demo/).

Here is the [GitHub repository](https://github.com/alitursucular/bouncing-ball-with-CSS-keyframes-demo) of the project.

<sup>1</sup> _https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes_.
