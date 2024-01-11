document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("figure.pictures-picture").forEach((elem) => {
    const link = elem.querySelector("a");
    const lightBox = elem.querySelector(".lightbox");
    link.addEventListener("click", (ev) => {
      ev.preventDefault();
      lightBox.classList.remove("closed");
    });
    lightBox.addEventListener("click", (ev) => {
      ev.preventDefault();
      lightBox.classList.add("closed");
    });
  });
});
