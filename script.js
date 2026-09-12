/* =========================
   MOBILE NAVIGATION
========================= */

const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar nav a");


// Close the mobile navigation after clicking a link

navLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        navbar.classList.remove("menu-open");

    });

});



/* =========================
   SMOOTH SCROLLING
========================= */

navLinks.forEach(function(link) {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(
            link.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});



/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const submitButton =
        contactForm.querySelector('button[type="submit"]');

    const name =
        contactForm.querySelector('input[name="name"]').value;

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";

    const formData = new FormData(contactForm);

    try {

        const response = await fetch(
            contactForm.action,
            {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (response.ok) {

            formMessage.textContent =
                "Thanks " + name +
                "! Your project request has been sent successfully.";

            contactForm.reset();

            submitButton.textContent = "Sent ✓";

        } else {

            formMessage.textContent =
                "Something went wrong. Please try again.";

            submitButton.disabled = false;
            submitButton.textContent =
                "Send Project Request ↗";
        }

    } catch (error) {

        formMessage.textContent =
            "Something went wrong. Please check your internet connection.";

        submitButton.disabled = false;
        submitButton.textContent =
            "Send Project Request ↗";
    }

});

/* =========================
   CURRENT YEAR
========================= */

const yearElement =
    document.getElementById("year");


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}



/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(
    ".project-card, .service-card, .price-card, .about-content, .contact-form"
);


const revealObserver =
    new IntersectionObserver(

        function(entries) {

            entries.forEach(function(entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.15
        }

    );


revealElements.forEach(function(element) {

    revealObserver.observe(element);

});