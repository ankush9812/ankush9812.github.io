document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.querySelector(".nav-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = Array.from(document.querySelectorAll(".nav-link"));
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const yearNode = document.getElementById("current-year");
    const profileFrame = document.querySelector(".profile-frame");
    const profilePhoto = document.getElementById("profile-photo");

    if (yearNode) {
        yearNode.textContent = String(new Date().getFullYear());
    }

    if (profileFrame && profilePhoto) {
        profilePhoto.addEventListener("load", () => {
            profileFrame.classList.add("has-image");
        });

        profilePhoto.addEventListener("error", () => {
            profileFrame.classList.remove("has-image");
        });

        if (profilePhoto.complete && profilePhoto.naturalWidth > 0) {
            profileFrame.classList.add("has-image");
        }
    }

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    const activateLink = () => {
        let currentId = "";

        sections.forEach((section) => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;

            if (window.scrollY >= top && window.scrollY < bottom) {
                currentId = section.id;
            }
        });

        navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${currentId}`;
            link.classList.toggle("active", isActive);
        });
    };

    window.addEventListener("scroll", activateLink, { passive: true });
    activateLink();
});
