/* eslint-disable no-undef */
const outlines = document.querySelectorAll(".text-outline");
const trigger = document.querySelector("#trigger");
const beers = document.querySelectorAll(".beers");
const logoPlate = document.querySelector(".logo-plate");
const navbar = document.querySelector(".main-nav");
const core = document.querySelector(".core");

let controller = new ScrollMagic.Controller();

window.onload = () => {
	centerOutlines();

	stopFixedBeer();

	let tween = new TimelineMax();
	tween.add(TweenMax.to("#beer1", 1, { opacity: 0 }), "first");

	let scene = new ScrollMagic.Scene({
		triggerElement: "#trigger",
		triggerHook: "onLeave",
		duration: "100%"
	})
		.setTween(tween)
		// .addIndicators({ name: "tween" })
		.addTo(controller);

	$("#seasonal-carousel").slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$("#reserve-carousel").slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 5,
		slidesToScroll: 5,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					infinite: true,
					dots: false
				}
			},
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	$("#events-carousel").slick({
		dots: false,
		infinite: true,
		speed: 300,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 680,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});

	window.onscroll = () => {
		shrinkNav();

		stopFixedBeer();

		if (document.querySelector("#trigger")) {
			triggerBound = trigger.getBoundingClientRect().top;

			if (
				triggerBound <= 0 &&
				core.getBoundingClientRect().bottom > window.innerHeight
			) {
				for (let i = 0; i < beers.length; i++) {
					const beer = beers[i];
					beer.style.position = "fixed";
					beer.style.top = 50 + "%";
				}
			} else if (triggerBound > 0) {
				for (let i = 0; i < beers.length; i++) {
					const beer = beers[i];
					beer.style.position = "absolute";
					beer.style.top = 25 + "%";
				}
			}
		}
	};
};

//when the slick slide initializes we want to set all of our slides to the same height
$("#events-carousel").on("setPosition", function() {
	jbResizeSlider();
});

//we need to maintain a set height when a resize event occurs.
//Some events will through a resize trigger: $(window).trigger('resize');
$(window).on("resize", function(e) {
	jbResizeSlider();
});

//since multiple events can trigger a slider adjustment, we will control that adjustment here
function jbResizeSlider() {
	$slickSlider = $("#events-carousel");
	$slickSlider
		.find(".slick-slide")
		.height($slickSlider.find(".slick-slide").width() * (7 / 8));

	var slickTrack = $slickSlider.find(".slick-track");
	var slickTrackHeight = $(slickTrack).height();

	$slickSlider.find(".slick-slide").css("height", slickTrackHeight + "px");
}

function centerOutlines() {
	for (let i = 0; i < outlines.length; i++) {
		const outline = outlines[i];
		const height = outline.offsetHeight;
		outline.style.top = -(height / 2) + "px";
	}
}

function shrinkNav() {
	if (
		document.body.scrollTop >= 80 ||
		document.documentElement.scrollTop >= 80
	) {
		logoPlate.classList.add("shrink-plate");
		navbar.style.backgroundColor = "black";
	} else {
		logoPlate.classList.remove("shrink-plate");
		navbar.style.backgroundColor = "white";
	}
}

function stopFixedBeer() {
	if (document.querySelector(".core")) {
		coreBottom = core.getBoundingClientRect().bottom;

		if (coreBottom <= window.innerHeight) {
			for (let i = 0; i < beers.length; i++) {
				const beer = beers[i];
				beer.style.position = "absolute";
				beer.style.top = 75 + "%";
			}
		}
	}
}
