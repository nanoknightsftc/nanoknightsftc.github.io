const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ========================================
// TERMINAL BOOT SEQUENCE (opt-in via ?boot=1)
// ========================================
function initBootSequence() {
  const overlay = document.getElementById("boot-overlay");
  if (!overlay) return;

  const params = new URLSearchParams(window.location.search);
  const bootEnabled = params.get("boot") === "1";

  if (!bootEnabled || prefersReducedMotion) {
    overlay.remove();
    return;
  }

  document.body.classList.add("boot-active");
  const linesEl = document.getElementById("boot-lines");
  const lines = [
    "> INITIALIZING NANO KNIGHTS TERMINAL...",
    "> TEAM 26147 // DECODE 2025-2026",
    "> LOADING ROSTER... [OK]",
    "> CALIBRATING DRIVETRAIN... [OK]",
    "> ESTABLISHING UPLINK... [OK]",
    "> WELCOME TO THE NANO KNIGHTS.",
  ];

  const typeSpeed = 18;
  const lineDelay = 180;
  let lineIndex = 0;

  function typeLine() {
    if (lineIndex >= lines.length) {
      window.setTimeout(() => {
        overlay.classList.add("boot-done");
        document.body.classList.remove("boot-active");
        window.setTimeout(() => overlay.remove(), 500);
      }, 500);
      return;
    }

    const div = document.createElement("div");
    linesEl.appendChild(div);
    const text = lines[lineIndex];
    let charIndex = 0;

    function typeChar() {
      div.textContent = text.slice(0, charIndex);
      charIndex++;
      if (charIndex <= text.length) {
        window.setTimeout(typeChar, typeSpeed);
      } else {
        lineIndex++;
        window.setTimeout(typeLine, lineDelay);
      }
    }

    typeChar();
  }

  typeLine();
}

initBootSequence();

// Define showPage function first
function showPage(pageId) {
  const target = document.getElementById(pageId);
  const current = document.querySelector(".page.active");
  if (!target || target === current) return;

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  const activateTarget = () => {
    document.querySelectorAll(".page").forEach((page) => {
      page.classList.remove("active", "page-leaving");
    });
    target.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
    requestAnimationFrame(() => recheckRevealsIn(target));
  };

  if (!current || prefersReducedMotion) {
    activateTarget();
    return;
  }

  current.classList.remove("active");
  current.classList.add("page-leaving");
  window.setTimeout(activateTarget, 200);
}

// Image loading helper function
function loadImage(elementId, imageUrl) {
  const element = document.getElementById(elementId);
  if (element) {
    const img = element.querySelector("img");
    if (img) {
      img.src = imageUrl;
      img.onload = () => {
        element.classList.add("has-image");
      };
    }
  }
}

// Video loading helper function
function loadVideo(elementId, videoUrl) {
  const element = document.getElementById(elementId);
  if (element) {
    const video = element.querySelector("video");
    if (video) {
      video.src = videoUrl;
      video.onload = () => {
        element.classList.add("has-image");
      };
    }
  }
}

// Image link loading helper function
function loadImageLink(elementId, imageUrl) {
  const element = document.getElementById(elementId);
  if (element) {
    const a = element.querySelector("a");
    if (a) {
      a.href = imageUrl;
    }
  }
}

// ========================================
// HOME - Hero photo grid
// ========================================
loadImage('home-photo-1', './media/teamphoto.jpeg');
loadImage('home-photo-2', './media/working.jpeg');
loadImage('home-photo-3', './media/decode.jpeg');
loadImage('home-photo-4', './media/senator.jpeg');
loadImage('home-sponsor-1', './media/baqir-logo.png');
loadImage('sponsor-logo-1', './media/baqir-logo.png');
loadImage('home-sponsor-2', './media/metegrity-logo.png');
loadImage('sponsor-logo-2', './media/metegrity-logo.png');

// ========================================
// EXISTING IMAGES - Already loaded
// ========================================
loadImage('home-robot-img', './media/teamphoto.jpeg');
loadImage('ftc-img', "./media/ftclogo.jpeg")
loadImageLink("robot-img-2", "./media/Team image 1.jpeg");
loadVideo('robot-main-video', './media/shooting.mp4');
loadImage("robot-img-1", "./media/bottomplate.jpeg");
loadImageLink("robot-img-1", "./media/bottomplate.jpeg");
loadImage("robot-img-2", "./media/drivetrain.jpeg");
loadImageLink("robot-img-2", "./media/drivetrain.jpeg");
loadImage('robot-img-3', './media/shooter.jpeg');
loadImageLink("robot-img-3", "./media/shooter.jpeg");
loadImage('robot-img-4', './media/Intake.jpeg');
loadImageLink("robot-img-2", "./media/Intake.jpeg");
loadImage('robot-img-5', './media/bottom.jpeg');
loadImage('robot-img-6', './media/topdown.jpeg');
loadVideo('robot-video-1', './media/spindex.mp4');
loadVideo('robot-video-2', './media/Auton.mp4');
loadVideo('robot-video-3', './media/shootertesting.mp4');
loadImage('team-photo-img', './media/working.jpeg');
loadImage('competition-img-1', './media/intothedeep2.jpeg');
loadImage('competition-img-2', './media/working.jpeg');
loadImage('daye-img', './media/daye.jpeg');
loadImage('metegrity-img', './media/metegrity-industries.jpg');

// ========================================
// GALLERY - DECODE SEASON (2025-2026)
// ========================================
loadImage('decode-img-1', './media/decode.jpeg');
loadImage('decode-img-2', './media/working.jpeg');
loadImage('decode-img-3', './media/team2.jpeg');
loadImage('decode-img-4', './media/field.jpeg');
loadImage('decode-img-5', './media/teams.jpeg');
loadImage('decode-img-6', './media/shooter.jpeg');
loadImage('decode-img-7', './media/senator.jpeg');
loadImage('decode-img-8', './media/bottomplate.jpeg');
loadImage('decode-img-9', './media/drivetrain.jpeg');
loadImage('decode-img-10', './media/Intake.jpeg');

// ========================================
// GALLERY - INTO THE DEEP SEASON (2024-2025)
// ========================================
loadImage('itd-img-1', './media/intothedeep.jpeg');
loadImage('itd-img-2', './media/idp4.jpeg');
loadImage('itd-img-3', './media/intothedeep3.jpeg');
loadImage('itd-img-4', './media/intothedeep2.jpeg');

let lastScroll = 0;
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    nav.style.boxShadow = "none";
  } else {
    nav.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.5)";
  }

  lastScroll = currentScroll;
});

// ========================================
// SCROLL-REVEAL + COUNT-UP ANIMATIONS
// ========================================
const REVEAL_SELECTOR =
  ".content-section, .team-member, .sponsor-card, .tier-card, .stat, .spec-item, " +
  ".timeline-item, .image-grid-item, .sponsor-logo-slot, .telemetry-strip";

let revealObserver = null;

function animateCountUp(el) {
  const raw = el.textContent.trim();
  const match = raw.match(/^(\d+)(.*)$/);
  if (!match) return;

  const targetValue = parseInt(match[1], 10);
  const suffix = match[2];
  const duration = 1800;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = Math.pow(progress, 3);
    el.textContent = Math.round(targetValue * eased) + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = targetValue + suffix;
    }
  }

  requestAnimationFrame(tick);
}

function revealNow(el) {
  if (el.classList.contains("in-view")) return;
  el.classList.add("in-view");

  if (prefersReducedMotion) return;
  el.querySelectorAll(".telemetry-value, .stat-number").forEach(animateCountUp);
}

function recheckRevealsIn(container) {
  if (!container) return;
  container.querySelectorAll(".reveal:not(.in-view)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) {
      revealNow(el);
      if (revealObserver) revealObserver.unobserve(el);
    }
  });
}

function setupScrollReveal() {
  const elements = document.querySelectorAll(REVEAL_SELECTOR);
  elements.forEach((el) => el.classList.add("reveal"));

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("in-view"));
    return;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealNow(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
  );

  elements.forEach((el) => revealObserver.observe(el));
}

setupScrollReveal();

// ========================================
// HERO CURSOR-FOLLOW GLOW
// ========================================
const heroCompact = document.querySelector(".hero-compact");
if (heroCompact && !prefersReducedMotion) {
  heroCompact.addEventListener("mousemove", (e) => {
    const rect = heroCompact.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    heroCompact.style.setProperty("--mx", `${x}%`);
    heroCompact.style.setProperty("--my", `${y}%`);
  });
}

// ========================================
// ACTIVE NAV LINK ON LOAD
// ========================================
const initialActivePage = document.querySelector(".page.active");
if (initialActivePage) {
  const initialLink = document.querySelector(
    `.nav-links a[data-page="${initialActivePage.id}"]`
  );
  if (initialLink) initialLink.classList.add("active");
}