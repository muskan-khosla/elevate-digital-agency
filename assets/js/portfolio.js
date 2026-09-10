/* =========================================
   PORTFOLIO FILTER
   Filters project cards based on category
========================================= */

const portfolioFilters = document.querySelectorAll(".portfolio-filter");
const portfolioProjects = document.querySelectorAll(
    ".featured-project-card"
);

portfolioFilters.forEach((filterButton) => {

    filterButton.addEventListener("click", () => {

        // Get selected category
        const selectedFilter = filterButton.dataset.filter;

        // Remove active state from all buttons
        portfolioFilters.forEach((button) => {
            button.classList.remove("active");
        });

        // Activate clicked button
        filterButton.classList.add("active");

        // Show / hide projects
        portfolioProjects.forEach((project) => {

            const categories = project.dataset.category || "";

            if (
                selectedFilter === "all" ||
                categories.includes(selectedFilter)
            ) {
                project.classList.remove("is-hidden");
            } else {
                project.classList.add("is-hidden");
            }

        });

    });

});