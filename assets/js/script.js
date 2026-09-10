/*=========================================
            STICKY HEADER
=========================================*/

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

});


/*=========================================
            MOBILE MENU
=========================================*/

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const overlay = document.querySelector(".mobile-overlay");
const navLinks = document.querySelectorAll(".nav-links a");

// Open / Close Menu
menuToggle.addEventListener("click", () => {

    menuToggle.classList.toggle("active");
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");

    // Prevent body scroll
    document.body.classList.toggle("menu-open");

});


// Close Menu
function closeMenu() {

    menuToggle.classList.remove("active");
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");

}

// Close when clicking overlay
overlay.addEventListener("click", closeMenu);

// Close when clicking any menu link
navLinks.forEach(link => {

    link.addEventListener("click", closeMenu);

});

// Close on Escape key
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {
        closeMenu();
    }

});



// FAQ 
document.addEventListener("DOMContentLoaded", function () {

    const accordionItems = document.querySelectorAll(".accordion-item");

    accordionItems.forEach(item => {
        const header = item.querySelector(".accordion-header");

        header.addEventListener("click", () => {

            const isActive = item.classList.contains("active");

            // Close all items
            accordionItems.forEach(acc => {
                acc.classList.remove("active");
            });

            // Open only the clicked item
            if (!isActive) {
                item.classList.add("active");
            }

        });
    });

});



// results 
/*=========================================
        RESULTS COUNTER ANIMATION
=========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(
    (entries, observer) => {

        entries.forEach((entry) => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            let current = 0;

            // Speed of the counter
            const duration = 3800;
            const increment = target / (duration / 8);

            const updateCounter = () => {

                current += increment;

                if (current < target) {

                    counter.textContent = Math.ceil(current);

                    requestAnimationFrame(updateCounter);

                } else {

                    // Make sure the final number is exact
                    counter.textContent = target;
                }
            };

            updateCounter();

            // Don't animate the same counter again
            observer.unobserve(counter);
        });

    },
    {
        threshold: 0.5
    }
);


/* Start observing every counter */
counters.forEach((counter) => {
    counterObserver.observe(counter);
});




/* =========================================
   CASE STUDIES SLICK SLIDER
========================================= */
$('.case-studies-slider').slick({
    slidesToShow:3,
    slidesToScroll:1,
    arrows:false,
    dots:true,
    infinite:true,
    autoplay:true,
    autoplaySpeed:4000,
    adaptiveHeight:false,
    responsive: [
            {
                breakpoint: 992,

                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 650,

                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]
});


/* =========================================
   TESTIMONIALS SLIDER
========================================= */

$(document).ready(function () {

    $('.testimonials-slider').slick({

        slidesToShow: 3,
        slidesToScroll: 1,

        speed: 600,

        arrows: false,
        dots: true,

        autoplay: false,
        infinite: true,

        adaptiveHeight: false,

        responsive: [

            {
                breakpoint: 992,

                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },

            {
                breakpoint: 650,

                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }

        ]

    });

});



/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

document.addEventListener("DOMContentLoaded", function () {

    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    // Stop observing once the animation has played.
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });

});




/* ==========================================
   CASE STUDY CATEGORY FILTER
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".case-filter");
    const caseCards = document.querySelectorAll(".case-study-card");

    // Stop if the Case Studies filter does not exist on this page
    if (!filterButtons.length || !caseCards.length) {
        return;
    }

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Get the selected filter
            const selectedFilter = button.dataset.filter;

            /* ------------------------------------------
               UPDATE ACTIVE FILTER BUTTON
            ------------------------------------------ */

            filterButtons.forEach((filterButton) => {
                filterButton.classList.remove("active");
                filterButton.setAttribute("aria-selected", "false");
            });

            button.classList.add("active");
            button.setAttribute("aria-selected", "true");


            /* ------------------------------------------
               FILTER CASE STUDY CARDS
            ------------------------------------------ */

            caseCards.forEach((card) => {

                // Cards can have multiple categories
                // Example: "saas development"
                const categories = card.dataset.category
                    .split(" ")
                    .map((category) => category.trim());

                // Show all cards when "All Projects" is selected
                const shouldShow =
                    selectedFilter === "all" ||
                    categories.includes(selectedFilter);

                if (shouldShow) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

});