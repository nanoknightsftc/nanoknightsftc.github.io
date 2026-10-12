// Define showPage function first
function showPage(pageId) {
  setNavOpen(false);

  const target = document.getElementById(pageId);
  const current = document.querySelector(".page.active");
  if (!target || target === current) return;

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });
  target.classList.add("active");
  window.scrollTo(0, 0);
}

// Images start loading only when their box gets near the screen. We watch the
// box, not the <img>: the <img> is display:none until it loads, and the
// browser's own loading="lazy" never fires for a hidden image.
const lazyImageObserver = "IntersectionObserver" in window
  ? new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        entry.target.querySelector("img").src = entry.target.dataset.imageUrl;
      });
    }, { rootMargin: "600px 0px" })
  : null;

// Image loading helper function
function loadImage(elementId, imageUrl) {
  const element = document.getElementById(elementId);
  if (element) {
    const img = element.querySelector("img");
    if (img) {
      img.decoding = "async";
      img.onload = () => {
        element.classList.add("has-image");
      };
      if (lazyImageObserver) {
        element.dataset.imageUrl = imageUrl;
        lazyImageObserver.observe(element);
      } else {
        img.src = imageUrl;
      }
    }
  }
}

// Video loading helper function
function loadVideo(elementId, videoUrl) {
  const element = document.getElementById(elementId);
  if (element) {
    const video = element.querySelector("video");
    if (video) {
      video.preload = "metadata"; // only fetch the first frame until someone presses play
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
loadVideo('biobuzz-robot-video-1', './media/shooter-prototype.mp4');
loadImage('team-photo-img', './media/working.jpeg');
loadImage('competition-img-1', './media/intothedeep2.jpeg');
loadImage('competition-img-2', './media/working.jpeg');
loadImage('daye-img', './media/daye.jpeg');
loadImage('metegrity-img', './media/metegrity-industries.jpg');

// ========================================
// GALLERY - BIOBUZZ SEASON (2026-2027)
// ========================================
loadImage('biobuzz-img-1', './media/biobuzz.jpeg');
loadVideo('biobuzz-video-1', './media/shooter-prototype.mp4');

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

// ========================================
// SPONSOR CONTACT FORM
// ========================================
function scrollToSponsorForm() {
  const form = document.getElementById('sponsor-form');
  if (form) form.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const sponsorForm = document.getElementById('sponsor-contact-form');
if (sponsorForm) {
  sponsorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('sponsor-form-status');
    const submitBtn = sponsorForm.querySelector('.sponsor-form-submit');
    submitBtn.disabled = true;
    status.textContent = '';
    status.classList.remove('form-status-success', 'form-status-error');

    try {
      const response = await fetch(sponsorForm.action, {
        method: 'POST',
        body: new FormData(sponsorForm),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        sponsorForm.reset();
        status.textContent = "Thanks for reaching out! We'll get back to you soon.";
        status.classList.add('form-status-success');
      } else {
        status.textContent = 'Something went wrong. Please email us directly at contact@nanoknightsftc.com.';
        status.classList.add('form-status-error');
      }
    } catch (err) {
      status.textContent = 'Something went wrong. Please email us directly at contact@nanoknightsftc.com.';
      status.classList.add('form-status-error');
    } finally {
      submitBtn.disabled = false;
    }
  });
}

// ========================================
// MOBILE / TABLET NAV MENU
// ========================================
const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");

function setNavOpen(open) {
  if (!nav || !navToggle) return;
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    setNavOpen(!nav.classList.contains("open"));
  });

  // Tap anywhere outside the bar to dismiss
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) setNavOpen(false);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // Growing past the hamburger breakpoint (e.g. rotating a tablet) resets the menu
  window.matchMedia("(min-width: 1101px)").addEventListener("change", (e) => {
    if (e.matches) setNavOpen(false);
  });
}

// ========================================
// NAV BAR SHADOW ON SCROLL
// ========================================

// Only touch the DOM when the state actually flips, not on every scroll frame
let navScrolled = false;
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY > 0;
  if (scrolled !== navScrolled) {
    navScrolled = scrolled;
    nav.classList.toggle("scrolled", scrolled);
  }
}, { passive: true });

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
