// =========================
// CURRENT YEAR
// =========================

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// =========================
// MOBILE HAMBURGER MENU
// =========================

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener(
        "click",
        function () {

            const isOpen =
                navMenu.classList.toggle("active");

            menuToggle.classList.toggle(
                "active",
                isOpen
            );

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );
        }
    );


    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navMenu.classList.remove(
                    "active"
                );

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        );

    });

}


// =========================
// CLOSE MOBILE MENU
// WHEN SCREEN GETS LARGE
// =========================

window.addEventListener(
    "resize",
    function () {

        if (
            window.innerWidth > 850 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );
        }

    }
);


// =========================
// SCROLL PROGRESS
// =========================

const scrollProgressBar =
    document.getElementById(
        "scrollProgressBar"
    );

function updateScrollProgress() {

    if (!scrollProgressBar) {
        return;
    }

    const scrollTop =
        window.scrollY ||
        document.documentElement.scrollTop;

    const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

    const progress =
        documentHeight > 0
            ? (
                scrollTop /
                documentHeight
            ) * 100
            : 0;

    scrollProgressBar.style.width =
        progress + "%";
}

window.addEventListener(
    "scroll",
    updateScrollProgress
);

updateScrollProgress();


// =========================
// BACK TO TOP
// =========================

const backToTopButton =
    document.getElementById("backToTop");

window.addEventListener(
    "scroll",
    function () {

        if (!backToTopButton) {
            return;
        }

        if (window.scrollY > 500) {

            backToTopButton.classList.add(
                "show"
            );

        } else {

            backToTopButton.classList.remove(
                "show"
            );

        }

    }
);


if (backToTopButton) {

    backToTopButton.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


// =========================
// REVEAL ON SCROLL
// =========================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );
                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


revealElements.forEach(
    function (element) {

        revealObserver.observe(
            element
        );

    }
);


// =========================
// STATS COUNTER
// =========================

const statsSection =
    document.getElementById("stats");

const statNumbers =
    document.querySelectorAll(
        ".stat-number"
    );

let statsAnimated = false;


function animateStats() {

    if (statsAnimated) {
        return;
    }

    statsAnimated = true;


    statNumbers.forEach(
        function (stat) {

            const target =
                Number(
                    stat.dataset.target
                );

            const suffix =
                stat.dataset.suffix || "";

            const duration = 1200;

            const startTime =
                performance.now();


            function updateNumber(
                currentTime
            ) {

                const elapsed =
                    currentTime -
                    startTime;

                const progress =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );

                const easedProgress =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );

                const number =
                    Math.floor(
                        target *
                        easedProgress
                    );

                stat.textContent =
                    number +
                    suffix;


                if (progress < 1) {

                    requestAnimationFrame(
                        updateNumber
                    );

                } else {

                    stat.textContent =
                        target +
                        suffix;

                }

            }


            requestAnimationFrame(
                updateNumber
            );

        }
    );

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
                threshold: 0.3
            }

        );


    statsObserver.observe(
        statsSection
    );

}


// =========================
// FAQ
// =========================

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(
    function (item) {

        const button =
            item.querySelector(
                ".faq-question"
            );

        const answer =
            item.querySelector(
                ".faq-answer"
            );


        button.addEventListener(
            "click",
            function () {

                const isOpen =
                    item.classList.contains(
                        "active"
                    );


                faqItems.forEach(
                    function (
                        otherItem
                    ) {

                        otherItem.classList.remove(
                            "active"
                        );

                        const otherAnswer =
                            otherItem.querySelector(
                                ".faq-answer"
                            );

                        otherAnswer.style.maxHeight =
                            null;

                    }
                );


                if (!isOpen) {

                    item.classList.add(
                        "active"
                    );

                    answer.style.maxHeight =
                        answer.scrollHeight +
                        "px";

                }

            }
        );

    }
);


// =========================
// CONTACT FORM
// =========================

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );


if (
    contactForm &&
    formMessage
) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );


            const nameInput =
                contactForm.querySelector(
                    'input[name="name"]'
                );


            const name =
                nameInput
                    ? nameInput.value
                    : "";


            submitButton.disabled =
                true;

            submitButton.textContent =
                "Sending...";


            const formData =
                new FormData(
                    contactForm
                );


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",

                            body:
                                formData,

                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    formMessage.textContent =
                        "Thanks " +
                        name +
                        "! Your project request has been sent successfully.";

                    contactForm.reset();

                    submitButton.textContent =
                        "Sent ✓";


                    setTimeout(
                        function () {

                            submitButton.disabled =
                                false;

                            submitButton.textContent =
                                "Send Project Request ↗";

                        },
                        3000
                    );

                } else {

                    formMessage.textContent =
                        "Something went wrong. Please try again.";

                    submitButton.disabled =
                        false;

                    submitButton.textContent =
                        "Send Project Request ↗";

                }

            } catch (error) {

                formMessage.textContent =
                    "Something went wrong. Please check your internet connection.";

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Project Request ↗";

            }

        }
    );

}
// =========================
// ACTIVE NAVBAR LINK
// =========================

const navigationLinks =
    document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );

function updateActiveNavLink() {

    const scrollPosition =
        window.scrollY + 160;

    let currentSectionId = "home";

    navigationLinks.forEach(
        function (link) {

            const sectionId =
                link
                    .getAttribute("href")
                    .substring(1);

            const section =
                document.getElementById(
                    sectionId
                );

            if (
                section &&
                section.offsetTop <=
                    scrollPosition
            ) {
                currentSectionId =
                    sectionId;
            }
        }
    );

    navigationLinks.forEach(
        function (link) {

            link.classList.toggle(
                "active",

                link.getAttribute("href") ===
                    "#" + currentSectionId
            );
        }
    );
}

window.addEventListener(
    "scroll",
    updateActiveNavLink
);

window.addEventListener(
    "load",
    updateActiveNavLink
);

updateActiveNavLink();
// =========================
// QUICK QUOTE ESTIMATOR
// =========================

const quoteType =
    document.getElementById("quoteType");

const quotePrice =
    document.getElementById("quotePrice");

if (quoteType && quotePrice) {

    quoteType.addEventListener(
        "change",
        function () {

            const selectedPrice =
                quoteType.value;

            quotePrice.textContent =
                "$" + selectedPrice;

        }
    );

}
// =========================
// SEND QUOTE PLAN TO CONTACT
// =========================

const quoteStartButton =
    document.getElementById("quoteStartButton");

const contactWebsiteType =
    document.getElementById("contactWebsiteType");

if (
    quoteStartButton &&
    quoteType &&
    contactWebsiteType
) {

    quoteStartButton.addEventListener(
        "click",
        function () {

            const selectedPlan =
                quoteType.options[
                    quoteType.selectedIndex
                ].textContent.trim();

            contactWebsiteType.value =
                selectedPlan;
        }
    );

}
// =========================
// QUICK QUOTE → CONTACT PLAN
// =========================

(function () {

    const quoteSelector =
        document.getElementById("quoteType");

    const planSelector =
        document.getElementById("contactWebsitePlan");

    const startButton =
        document.querySelector(
            '.quote-box a[href="#contact"]'
        );

    if (
        !quoteSelector ||
        !planSelector ||
        !startButton
    ) {
        return;
    }

    startButton.addEventListener(
        "click",
        function () {

            if (quoteSelector.selectedIndex === 0) {
                planSelector.value = "Starter";
            }

            if (quoteSelector.selectedIndex === 1) {
                planSelector.value = "Business";
            }

            if (quoteSelector.selectedIndex === 2) {
                planSelector.value = "Premium";
            }

        }
    );

})();
// =========================
// QUICK QUOTE
// =========================

(function () {

    const quoteSelect =
        document.getElementById("quoteType");

    const priceDisplay =
        document.getElementById("quotePrice");

    const startButton =
        document.getElementById("quoteStartButton");

    const planSelect =
        document.getElementById("contactWebsitePlan");


    if (quoteSelect && priceDisplay) {

        function updateQuotePrice() {

            const selectedOption =
                quoteSelect.options[
                    quoteSelect.selectedIndex
                ];

            const price =
                selectedOption.dataset.price;

            priceDisplay.textContent =
                "$" + price;
        }


        quoteSelect.addEventListener(
            "change",
            updateQuotePrice
        );

        updateQuotePrice();
    }


    if (
        quoteSelect &&
        startButton &&
        planSelect
    ) {

        startButton.addEventListener(
            "click",
            function () {

                planSelect.value =
                    quoteSelect.value;

            }
        );

    }

})();
// =========================
// HERO MOUSE GLOW
// =========================

const heroSection =
    document.querySelector(".hero");

const heroGlow =
    document.getElementById("heroGlow");

if (heroSection && heroGlow) {

    heroSection.addEventListener(
        "mousemove",
        function (event) {

            const heroRect =
                heroSection.getBoundingClientRect();

            const x =
                event.clientX - heroRect.left;

            const y =
                event.clientY - heroRect.top;

            heroGlow.style.left =
                x + "px";

            heroGlow.style.top =
                y + "px";

        }
    );

    heroSection.addEventListener(
        "mouseleave",
        function () {

            heroGlow.style.opacity = "0";

        }
    );

    heroSection.addEventListener(
        "mouseenter",
        function () {

            heroGlow.style.opacity = "1";

        }
    );

}
// =========================
// PROJECT CARD 3D TILT
// =========================

const projectCards =
    document.querySelectorAll(".project-card");

projectCards.forEach(function (card) {

    card.addEventListener("mousemove", function (event) {

        const rect =
            card.getBoundingClientRect();

        const x =
            event.clientX - rect.left;

        const y =
            event.clientY - rect.top;

        const centerX =
            rect.width / 2;

        const centerY =
            rect.height / 2;

        const rotateX =
            ((y - centerY) / centerY) * -5;

        const rotateY =
            ((x - centerX) / centerX) * 5;

        card.style.transform =
            `perspective(900px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-6px)`;

        card.classList.add("tilting");
    });


    card.addEventListener("mouseleave", function () {

        card.style.transform =
            "perspective(900px) rotateX(0deg) rotateY(0deg)";

        card.classList.remove("tilting");
    });

});
// =========================
// NAVBAR SCROLL EFFECT
// =========================

const navbar =
    document.querySelector(".navbar");

function updateNavbarScroll() {

    if (!navbar) {
        return;
    }

    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateNavbarScroll
);

updateNavbarScroll();
// =========================
// PRICING BUTTONS → CONTACT PLAN
// =========================

const choosePlanButtons =
    document.querySelectorAll(".choose-plan");

const websitePlanSelect =
    document.getElementById("contactWebsitePlan");

choosePlanButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (!websitePlanSelect) {
            return;
        }

        const selectedPlan =
            button.dataset.plan;

        websitePlanSelect.value =
            selectedPlan;

    });

});
// =========================
// PROJECT FILTERS
// =========================

(function () {

    const filterButtons =
        document.querySelectorAll(".project-filter");

    const filterCards =
        document.querySelectorAll(
            ".project-card[data-category]"
        );

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const selectedFilter =
                button.dataset.filter;

            // Change active button
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");


            // Show / hide projects
            filterCards.forEach(function (card) {

                const category =
                    card.dataset.category;

                if (
                    selectedFilter === "all" ||
                    selectedFilter === category
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }

            });

        });

    });

})();
// =========================
// HERO ROTATING TEXT
// =========================

const rotatingWord =
    document.getElementById("rotatingWord");

const rotatingWords = [
    "businesses.",
    "portfolios.",
    "restaurants.",
    "bold ideas."
];

let rotatingIndex = 0;

if (rotatingWord) {

    setInterval(function () {

        rotatingWord.classList.add("changing");

        setTimeout(function () {

            rotatingIndex =
                (rotatingIndex + 1) %
                rotatingWords.length;

            rotatingWord.textContent =
                rotatingWords[rotatingIndex];

            rotatingWord.classList.remove("changing");

        }, 250);

    }, 2200);

}