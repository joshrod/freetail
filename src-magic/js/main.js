let controller = new ScrollMagic.Controller();

window.onload = () => {
  let tween = new TimelineMax();
  tween.add(TweenMax.to("#beer1", 1, { opacity: 0 }), "first");

  let scene = new ScrollMagic.Scene({
    triggerElement: "#trigger",
    triggerHook: "onLeave",
    duration: "100%"
  })
    .setTween(tween)
    .addIndicators({ name: "tween" })
    .addTo(controller);
};
