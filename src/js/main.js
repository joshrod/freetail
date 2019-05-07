/* eslint-disable no-undef */
const outlines = document.querySelectorAll('.text-outline');
const trigger = document.querySelector('#trigger');
const beers = document.querySelectorAll('.beers');

let controller = new ScrollMagic.Controller();

window.onload = () => {
    
    centerOutlines();

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


    window.onscroll = () => {
        triggerBound = trigger.getBoundingClientRect().top;

        if (triggerBound <= 0) {
            for (let i = 0; i < beers.length; i++) {
                const beer = beers[i];
                beer.style.position = 'fixed';
                beer.style.top = 0;
                beer.style.left = 0;
                beer.style.height = 100 + '%';
            }
        }
        else {
            for (let i = 0; i < beers.length; i++) {
                const beer = beers[i];
                beer.style.position = 'absolute';
                beer.style.height = 50 + '%';
            }
        }
    }
};

function centerOutlines() {
    for (let i = 0; i < outlines.length; i++) {
        const outline = outlines[i];
        const height = outline.offsetHeight;
        outline.style.top = -(height / 2) + 'px';
    }
}