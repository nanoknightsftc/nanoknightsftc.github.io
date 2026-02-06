// Define showPage function first
function showPage(pageId) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => {
    page.classList.remove("active");
  });

  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
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

// Example usage (uncomment and replace with your image URLs):
loadImage('home-robot-img', './media/teamphoto.jpeg');
loadImage('ftc-img', './media/ftclogo.jpeg')
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
