// =========================
// FIREBASE
// =========================

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    orderBy,
    onSnapshot
}
from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyAi6u0d3fWzqHnMphdtXf-BAGNNPou-XQM",
  authDomain: "webynamo-2eb44.firebaseapp.com",
  projectId: "webynamo-2eb44",
  storageBucket: "webynamo-2eb44.firebasestorage.app",
  messagingSenderId: "999599719864",
  appId: "1:999599719864:web:02df4bce1ebe5364f8bb4d",
  measurementId: "G-FT20PM91EE"
};


const app =
    initializeApp(firebaseConfig);

const db =
    getFirestore(app);


// =========================
// REVIEW ELEMENTS
// =========================

const reviewForm =
    document.getElementById("reviewForm");

const reviewName =
    document.getElementById("reviewName");

const reviewRating =
    document.getElementById("reviewRating");

const reviewMessage =
    document.getElementById("reviewMessage");

const reviewStatus =
    document.getElementById("reviewStatus");

const reviewSubmitButton =
    document.getElementById("reviewSubmitButton");

const reviewsList =
    document.getElementById("reviewsList");


// =========================
// SUBMIT REVIEW
// =========================

if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            const name =
                reviewName.value.trim();

            const rating =
                Number(reviewRating.value);

            const message =
                reviewMessage.value.trim();


            if (
                !name ||
                !rating ||
                !message
            ) {
                reviewStatus.textContent =
                    "Please complete all fields.";

                return;
            }


            reviewSubmitButton.disabled = true;

            reviewSubmitButton.textContent =
                "Submitting...";

            reviewStatus.textContent = "";


            try {

                await addDoc(
                    collection(db, "reviews"),
                    {
                        name: name,
                        rating: rating,
                        message: message,
                        createdAt:
                            serverTimestamp()
                    }
                );


                reviewStatus.textContent =
                    "Thank you! Your review has been posted.";

                reviewForm.reset();


            } catch (error) {

                console.error(
                    "Review error:",
                    error
                );

                reviewStatus.textContent =
                    "Something went wrong. Please try again.";

            }


            reviewSubmitButton.disabled = false;

            reviewSubmitButton.textContent =
                "Submit Review ↗";

        }
    );

}


// =========================
// STAR DISPLAY
// =========================

function createStars(rating) {

    const fullStars =
        "★".repeat(rating);

    const emptyStars =
        "☆".repeat(5 - rating);

    return fullStars + emptyStars;
}


// =========================
// CREATE REVIEW CARD
// =========================

function createReviewCard(review) {

    const card =
        document.createElement("article");

    card.className =
        "customer-review-card";


    const stars =
        document.createElement("div");

    stars.className =
        "customer-review-stars";

    stars.textContent =
        createStars(review.rating);


    const message =
        document.createElement("p");

    message.className =
        "customer-review-message";

    message.textContent =
        "“" + review.message + "”";


    const footer =
        document.createElement("div");

    footer.className =
        "customer-review-footer";


    const name =
        document.createElement("strong");

    name.className =
        "customer-review-name";

    name.textContent =
        review.name;


    const date =
        document.createElement("span");

    date.className =
        "customer-review-date";


    if (
        review.createdAt &&
        review.createdAt.toDate
    ) {

        date.textContent =
            review.createdAt
                .toDate()
                .toLocaleDateString();

    } else {

        date.textContent =
            "Just now";

    }


    footer.appendChild(name);

    footer.appendChild(date);


    card.appendChild(stars);

    card.appendChild(message);

    card.appendChild(footer);


    return card;
}


// =========================
// LOAD ALL REVIEWS
// =========================

if (reviewsList) {

    const reviewsQuery =
        query(
            collection(db, "reviews"),
            orderBy("createdAt", "desc")
        );


    onSnapshot(
        reviewsQuery,

        function (snapshot) {

            reviewsList.innerHTML = "";


            if (snapshot.empty) {

                const emptyMessage =
                    document.createElement("p");

                emptyMessage.className =
                    "reviews-loading";

                emptyMessage.textContent =
                    "No reviews yet. Be the first to leave one!";

                reviewsList.appendChild(
                    emptyMessage
                );

                return;
            }


            snapshot.forEach(
                function (documentSnapshot) {

                    const review =
                        documentSnapshot.data();

                    const card =
                        createReviewCard(review);

                    reviewsList.appendChild(
                        card
                    );

                }
            );

        },

        function (error) {

            console.error(
                "Loading reviews failed:",
                error
            );

            reviewsList.textContent =
                "Reviews could not be loaded.";

        }
    );

}