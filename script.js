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

/* =========================
   SCROLL PROGRESS BAR
========================= */

const scrollProgressBar =
    document.getElementById("scrollProgressBar");

function updateScrollProgress() {

    if (!scrollProgressBar) {
        return;
    }

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

    scrollProgressBar.style.width =
        progress + "%";
}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

updateScrollProgress();

/* =========================
   BACK TO TOP
========================= */

const backToTopButton =
    document.getElementById("backToTop");


/* SHOW / HIDE BUTTON */

window.addEventListener("scroll", function () {

    if (!backToTopButton) {
        return;
    }

    if (window.scrollY > 500) {

        backToTopButton.classList.add("show");

    } else {

        backToTopButton.classList.remove("show");

    }

});


/* CONTROLLED SMOOTH SCROLL */

if (backToTopButton) {

    backToTopButton.addEventListener(
        "click",
        function () {

            const startPosition =
                window.scrollY;

            const duration = 650;

            let startTime = null;

            const oldScrollBehavior =
                document.documentElement.style.scrollBehavior;

            document.documentElement.style.scrollBehavior =
                "auto";


            function animation(currentTime) {

                if (startTime === null) {
                    startTime = currentTime;
                }

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(
                        elapsed / duration,
                        1
                    );


                /* SMOOTH EASING */

                const ease =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                window.scrollTo(
                    0,
                    startPosition *
                    (1 - ease)
                );


                if (progress < 1) {

                    requestAnimationFrame(
                        animation
                    );

                } else {

                    document.documentElement.style.scrollBehavior =
                        oldScrollBehavior;

                }

            }


            requestAnimationFrame(
                animation
            );

        }
    );

}
/* =========================
   ANIMATED STATS
========================= */

const statNumbers =
    document.querySelectorAll(".stat-number");

let statsAnimated = false;

const statsSection =
    document.getElementById("stats");


function animateStats() {

    if (statsAnimated) {
        return;
    }

    statsAnimated = true;


    statNumbers.forEach(function (stat) {

        const target =
            Number(stat.dataset.target);

        const suffix =
            stat.dataset.suffix || "";

        const duration = 1200;

        const startTime =
            performance.now();


        function updateNumber(currentTime) {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const easedProgress =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const currentNumber =
                Math.floor(
                    target * easedProgress
                );

            stat.textContent =
                currentNumber + suffix;


            if (progress < 1) {

                requestAnimationFrame(
                    updateNumber
                );

            } else {

                stat.textContent =
                    target + suffix;

            }

        }


        requestAnimationFrame(
            updateNumber
        );

    });

}


if (statsSection) {

    const statsObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            animateStats();

                            statsObserver.disconnect();

                        }

                    }
                );

            },
            {
                threshold: 0.35
            }
        );


    statsObserver.observe(
        statsSection
    );

}