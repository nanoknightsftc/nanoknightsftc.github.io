// Photos and videos are plain <img> / <video> tags in each page's HTML.
// To add one, copy an existing block in the page and change its src, alt,
// width and height. Nothing in this file needs to change.

// ========================================
// OUTREACH - one tab per event
// Click a tab, or use the arrow / Home / End keys while a tab has focus.
// ========================================
const outreachTabs = Array.from(document.querySelectorAll(".outreach-tab"));

function showOutreachTab(selectedTab) {
  outreachTabs.forEach((tab) => {
    const selected = tab === selectedTab;
    tab.classList.toggle("active", selected);
    tab.setAttribute("aria-selected", selected);
    tab.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(tab.getAttribute("aria-controls"));
    panel.classList.toggle("active", selected);
    panel.hidden = !selected;
  });
}

if (outreachTabs.length) {
  outreachTabs.forEach((tab, i) => {
    tab.addEventListener("click", () => showOutreachTab(tab));
    tab.addEventListener("keydown", (e) => {
      const last = outreachTabs.length - 1;
      const next = {
        ArrowRight: i === last ? 0 : i + 1,
        ArrowLeft: i === 0 ? last : i - 1,
        Home: 0,
        End: last,
      }[e.key];
      if (next === undefined) return;
      e.preventDefault();
      showOutreachTab(outreachTabs[next]);
      outreachTabs[next].focus();
    });
  });
  showOutreachTab(outreachTabs.find((tab) => tab.classList.contains("active")) || outreachTabs[0]);
}

// ========================================
// PHOTO VIEWER
// Clicking a photo wrapped in <a class="image-link"> opens it large on top
// of the page. Escape, the close button, or a click outside the photo closes it.
// ========================================
const imageLinks = document.querySelectorAll(".image-link");

if (imageLinks.length && typeof HTMLDialogElement === "function") {
  const viewer = document.createElement("dialog");
  viewer.className = "photo-viewer";
  viewer.setAttribute("aria-label", "Photo viewer");
  viewer.innerHTML = `
    <button type="button" class="photo-viewer-close" aria-label="Close photo">
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3 3l10 10M13 3 3 13"/></svg>
    </button>
    <img alt="">
    <p class="photo-viewer-caption"></p>`;
  document.body.appendChild(viewer);

  const viewerImg = viewer.querySelector("img");
  const viewerCaption = viewer.querySelector(".photo-viewer-caption");

  imageLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Ctrl / Cmd / Shift click still opens the file in a new tab or window
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      const caption = link.closest(".image-grid-item").nextElementSibling;
      viewerImg.src = link.href;
      viewerImg.alt = link.querySelector("img").alt;
      viewerCaption.textContent = caption ? caption.textContent : "";
      viewer.showModal();
    });
  });

  viewer.addEventListener("click", (e) => {
    if (e.target !== viewerImg) viewer.close();
  });
  viewer.addEventListener("close", () => viewerImg.removeAttribute("src"));
}

// ========================================
// SPONSOR CONTACT FORM
// ========================================
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
