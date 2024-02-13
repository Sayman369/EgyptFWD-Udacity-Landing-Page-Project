/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navbarElements = document.querySelectorAll("section");
const navbarLists = document.getElementById("navbar__list");

/**
 * End Global Variables
 */

// Build menu by iterating through the navelements
navbarElements.forEach((el) => {
	const navbarlistElement = `<li class='menu__link ${el.className}' data-link=${el.id}><a href="#${el.id}">${el.dataset.nav}</li>`;
	navbarLists.insertAdjacentHTML("beforeend", navbarlistElement);
});

// Scroll to section on link click by listenting to the click-event in the navlist
navbarLists.addEventListener("click", (e) => {
	e.preventDefault();
	const parent = e.target.hasAttribute("data-link")
		? e.target
		: e.target.parentElement;
	const elementToScrollTo = document.getElementById(parent.dataset.link);
	elementToScrollTo.scrollIntoView({ block: "end", behavior: "smooth" });
});

// Set section and nav link as active using the IntersectionObserver pattern
const callback = (entries) => {
	entries.forEach((entry) => {
		const navbarListElement = document.querySelector(
			`.menu__link[data-link='${entry.target.id}']`
		);
		const sections = document.getElementById(entry.target.id);

		if (entry && entry.isIntersecting) {
			navbarListElement.classList.add("active");
			sections.classList.add("active");
		} else {
			if (navbarListElement.classList.contains("active")) {
				navbarListElement.classList.remove("active");
			}

			if (sections.classList.contains("active")) {
				sections.classList.remove("active");
			}
		}
	});
};

// Options for the observer. Most important is the threshold
const feature = {
	root: null,
	rootMargin: "0px",
	threshold: 0.6,
};

// Setting an observer with options and a callback which checks if the navelement should be active
const observer = new IntersectionObserver(callback, feature);
navbarElements.forEach((el) => {
	observer.observe(document.getElementById(el.id));
});
