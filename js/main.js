// ─── CUSTOM CURSOR ───
const dot = document.getElementById("cursorDot");
const ring = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0,
  ringX = 0,
  ringY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX - 4 + "px";
  dot.style.top = mouseY - 4 + "px";
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;
  ring.style.left = ringX - 20 + "px";
  ring.style.top = ringY - 20 + "px";
  requestAnimationFrame(animateRing);
}
animateRing();

document
  .querySelectorAll(
    "a, button, .skill-card, .work-item, .mcode-feature, .bc-card, .pp-card",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => ring.classList.add("hover"));
    el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
  });

if ("ontouchstart" in window) {
  dot.style.display = "none";
  ring.style.display = "none";
}

// ─── MOBILE MENU ───
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("open");
  document.body.style.overflow = mobileMenu.classList.contains("open")
    ? "hidden"
    : "";
});

function closeMenu() {
  menuToggle.classList.remove("active");
  mobileMenu.classList.remove("open");
  document.body.style.overflow = "";
}

// ─── SCROLL REVEAL ───
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -50px 0px" },
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => revealObserver.observe(el));

// ─── PROJECTS PAGE ───
const projectsPage = document.getElementById("projectsPage");

function openProjectsPage() {
  projectsPage.classList.add("open");
  document.body.style.overflow = "hidden";
  projectsPage.scrollTop = 0;
}

function closeProjectsPage() {
  projectsPage.classList.remove("open");
  document.body.style.overflow = "";
}

// Close projects page with Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && projectsPage.classList.contains("open")) {
    closeProjectsPage();
  }
});

// ─── MCODE COUNTDOWN ───
const launchDate = new Date("2027-01-31T00:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = launchDate - now;

  if (distance < 0) {
    document.getElementById("days").textContent = "000";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";
    return;
  }

  document.getElementById("days").textContent = String(
    Math.floor(distance / (1000 * 60 * 60 * 24)),
  ).padStart(3, "0");
  document.getElementById("hours").textContent = String(
    Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
  ).padStart(2, "0");
  document.getElementById("minutes").textContent = String(
    Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
  ).padStart(2, "0");
  document.getElementById("seconds").textContent = String(
    Math.floor((distance % (1000 * 60)) / 1000),
  ).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ─── NAV SCROLL BEHAVIOR ───
let lastScroll = 0;
const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll > lastScroll && currentScroll > 100) {
    nav.style.transform = "translateY(-100%)";
    nav.style.transition = "transform 0.4s ease";
  } else {
    nav.style.transform = "translateY(0)";
  }
  lastScroll = currentScroll;
});

// ─── COUNTER ANIMATION ───
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text);
        if (isNaN(num)) {
          counterObserver.unobserve(el);
          return;
        }
        const suffix = text.replace(/[0-9]/g, "");
        let count = 0;
        const increment = Math.max(1, Math.ceil(num / 40));
        const timer = setInterval(() => {
          count += increment;
          if (count >= num) {
            count = num;
            clearInterval(timer);
          }
          el.textContent = count + suffix;
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll(".stat h3")
  .forEach((el) => counterObserver.observe(el));
