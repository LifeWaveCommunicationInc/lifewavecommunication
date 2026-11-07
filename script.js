(function () {
  var menu = document.querySelector(".menu-btn");
  var bar = document.querySelector(".topbar");
  menu.addEventListener("click", function () {
    bar.classList.toggle("open");
  });
})();