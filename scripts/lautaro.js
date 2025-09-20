const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");

videoModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const videoUrl = button.getAttribute("data-video");
  videoFrame.src = videoUrl + "?autoplay=1";
});

videoModal.addEventListener("hidden.bs.modal", () => {
  videoFrame.src = "";
});
