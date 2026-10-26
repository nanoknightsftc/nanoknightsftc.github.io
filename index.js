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
// OUTREACH - one tab per event
// ========================================
loadImage('outreach-fbcl-img-1', './media/outreach/fbcl-1.jpg');
loadImage('outreach-fbcl-img-2', './media/outreach/fbcl-2.jpg');
loadImage('outreach-fbcl-img-3', './media/outreach/fbcl-3.jpg');
loadImage('outreach-fbcl-img-4', './media/outreach/fbcl-4.jpg');
loadImage('outreach-roboraiders-img-1', './media/outreach/roboraiders-1.jpg');
loadImage('outreach-roboraiders-img-2', './media/outreach/roboraiders-2.jpg');
loadImage('outreach-roboraiders-img-3', './media/outreach/roboraiders-3.jpg');
loadImage('outreach-roboraiders-img-4', './media/outreach/roboraiders-4.jpg');

function showOutreachTab(eventId) {
  document.querySelectorAll(".outreach-tab").forEach((tab) => {
    const selected = tab.id === "outreach-tab-" + eventId;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", selected);
    tab.tabIndex = selected ? 0 : -1;
  });
  document.querySelectorAll(".outreach-panel").forEach((panel) => {
    const selected = panel.id === "outreach-" + eventId;
    panel.classList.toggle("active", selected);
    panel.hidden = !selected;
  });
}

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
// HOME - TESTIMONIAL SLIDESHOW
// With one testimonial nothing happens. With 2+, one shows at a time and
// they advance every 7s; hovering, focusing, or a hidden tab holds the timer.
// ========================================
const testimonialSection = document.querySelector(".testimonials");
const testimonialSlides = testimonialSection
  ? Array.from(testimonialSection.querySelectorAll(".testimonial"))
  : [];

if (testimonialSlides.length > 1) {
  const INTERVAL = 7000;
  const list = testimonialSection.querySelector(".testimonial-list");
  const controls = testimonialSection.querySelector(".testimonial-controls");
  const dotsWrap = testimonialSection.querySelector(".testimonial-dots");
  const pauseBtn = testimonialSection.querySelector('[data-action="pause"]');
  const holds = new Set(); // reasons the timer is on hold: "hover", "focus", "hidden"
  let userPaused = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let current = -1;
  let timer = null;
  let remaining = INTERVAL;
  let startedAt = 0;

  const isRunning = () => !userPaused && holds.size === 0;

  const dots = testimonialSlides.map((slide, i) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${i + 1} of ${testimonialSlides.length}`);

    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = "testimonial-dot";
    dot.setAttribute("aria-label", `Show testimonial ${i + 1}`);
    dot.style.setProperty("--testimonial-interval", `${INTERVAL}ms`);
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
    return dot;
  });

  function syncState() {
    testimonialSection.classList.toggle("is-autoplaying", !userPaused);
    testimonialSection.classList.toggle("is-user-paused", userPaused);
    testimonialSection.classList.toggle("is-held", holds.size > 0);
    // Screen readers hear the new quote only when it changed because of them
    list.setAttribute("aria-live", isRunning() ? "off" : "polite");
    pauseBtn.setAttribute("aria-label", userPaused ? "Play testimonials" : "Pause testimonials");
  }

  function schedule() {
    clearTimeout(timer);
    if (!isRunning()) return;
    startedAt = Date.now();
    timer = setTimeout(() => goTo(current + 1), remaining);
  }

  function stopClock() {
    if (isRunning()) remaining -= Date.now() - startedAt;
    clearTimeout(timer);
  }

  function goTo(index) {
    const next = (index + testimonialSlides.length) % testimonialSlides.length;
    if (next === current) return;
    current = next;
    testimonialSlides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    dots.forEach((dot, i) => dot.setAttribute("aria-current", String(i === current)));
    remaining = INTERVAL;
    schedule();
  }

  function hold(reason) {
    if (holds.has(reason)) return;
    stopClock();
    holds.add(reason);
    syncState();
  }

  function release(reason) {
    if (!holds.delete(reason)) return;
    syncState();
    schedule();
  }

  testimonialSection.setAttribute("aria-roledescription", "carousel");
  list.classList.add("is-slideshow");
  controls.hidden = false;

  testimonialSection.querySelector('[data-action="prev"]').addEventListener("click", () => goTo(current - 1));
  testimonialSection.querySelector('[data-action="next"]').addEventListener("click", () => goTo(current + 1));
  pauseBtn.addEventListener("click", () => {
    if (userPaused) {
      // Restart this quote's countdown from the top; re-adding .is-autoplaying
      // in syncState restarts the dot's fill animation at the same moment.
      userPaused = false;
      remaining = INTERVAL;
      syncState();
      schedule();
    } else {
      stopClock();
      userPaused = true;
      syncState();
    }
  });

  testimonialSection.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") hold("hover");
  });
  testimonialSection.addEventListener("pointerleave", (e) => {
    if (e.pointerType === "mouse") release("hover");
  });
  testimonialSection.addEventListener("focusin", () => hold("focus"));
  testimonialSection.addEventListener("focusout", (e) => {
    if (!testimonialSection.contains(e.relatedTarget)) release("focus");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hold("hidden");
    else release("hidden");
  });

  // Swipe left / right on phones
  let swipeStart = null;
  list.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") swipeStart = { x: e.clientX, y: e.clientY };
  });
  list.addEventListener("pointerup", (e) => {
    if (!swipeStart) return;
    const dx = e.clientX - swipeStart.x;
    const dy = e.clientY - swipeStart.y;
    swipeStart = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) goTo(current + (dx < 0 ? 1 : -1));
  });
  list.addEventListener("pointercancel", () => {
    swipeStart = null;
  });

  syncState();
  goTo(0);
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
