const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const submitButton = contactForm.querySelector(".contact-submit");
        const originalButtonText = submitButton.innerHTML;

        // Disable the button while the form is being submitted
        submitButton.disabled = true;
        submitButton.innerHTML =
            'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';

        // Clear previous status messages
        formStatus.textContent = "";
        formStatus.className = "form-status";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                contactForm.reset();

                formStatus.textContent =
                    "Thank you. Your message has been sent successfully.";

                formStatus.classList.add("success");
            } else {
                formStatus.textContent =
                    "Something went wrong. Please try again.";

                formStatus.classList.add("error");
            }
        } catch (error) {
            formStatus.textContent =
                "Unable to send your message right now. Please try again later.";

            formStatus.classList.add("error");
        } finally {
            // Restore the submit button
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }
    });
}