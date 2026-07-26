/* ==========================================
   AGENT FLUX
   Main JavaScript File
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    // ==========================
    // Mobile Navigation
    // ==========================

    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector("nav");

    if (menuBtn && nav) {

        menuBtn.addEventListener("click", () => {

            nav.classList.toggle("active");

        });

    }

    // ==========================
    // Close menu after clicking a link
    // ==========================

    document.querySelectorAll("nav a").forEach(link => {

        link.addEventListener("click", () => {

            nav.classList.remove("active");

        });

    });

    // ==========================
    // Sticky Header Shadow
    // ==========================

    window.addEventListener("scroll", () => {

        const header = document.querySelector("header");

        if (window.scrollY > 30) {

            header.style.boxShadow = "0 12px 30px rgba(0,0,0,.15)";

        } else {

            header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";

        }

    });

    // ==========================
    // Button Ripple Effect
    // ==========================

    document.querySelectorAll(".btn").forEach(button => {

        button.addEventListener("click", function(e) {

            const ripple = document.createElement("span");

            const rect = this.getBoundingClientRect();

            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + "px";

            ripple.style.left = (e.clientX - rect.left - size / 2) + "px";

            ripple.style.top = (e.clientY - rect.top - size / 2) + "px";

            ripple.className = "ripple";

            this.appendChild(ripple);

            setTimeout(() => {

                ripple.remove();

            }, 600);

        });

    });

});