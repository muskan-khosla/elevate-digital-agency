/* ==========================================
   FAQ ACCORDION
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    const faqButtons = document.querySelectorAll(".faq-question");

    faqButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const isExpanded =
                button.getAttribute("aria-expanded") === "true";

            const answerId =
                button.getAttribute("aria-controls");

            const answer =
                document.getElementById(answerId);


            // Close the other FAQ items
            faqButtons.forEach((otherButton) => {

                if (otherButton !== button) {

                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    const otherAnswerId =
                        otherButton.getAttribute("aria-controls");

                    const otherAnswer =
                        document.getElementById(otherAnswerId);

                    if (otherAnswer) {
                        otherAnswer.hidden = true;
                    }
                }

            });


            // Toggle the selected FAQ
            button.setAttribute(
                "aria-expanded",
                String(!isExpanded)
            );

            answer.hidden = isExpanded;

        });

    });

});