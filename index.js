// Define showPage function first
function showPage(pageId) {
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

// ========================================
// NAV BAR SHADOW ON SCROLL
// ========================================
const nav = document.querySelector(".nav");

window.addEventListener("scroll", () => {
  nav.style.boxShadow = window.pageYOffset <= 0 ? "none" : "0 5px 20px rgba(0, 0, 0, 0.5)";
});

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
