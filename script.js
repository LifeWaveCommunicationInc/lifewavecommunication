(function () {
  var slides = document.querySelectorAll(".slide");
  var dots = document.querySelectorAll(".dot");
  var i = 0;
  var timer;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (s, idx) { s.classList.toggle("active", idx === i); });
    dots.forEach(function (d, idx) { d.classList.toggle("active", idx === i); });
  }

  function start() {
    clearInterval(timer);
    timer = setInterval(function () { show(i + 1); }, 4500);
  }

  document.querySelector(".arrow.next").addEventListener("click", function () {
    show(i + 1);
    start();
  });
  document.querySelector(".arrow.prev").addEventListener("click", function () {
    show(i - 1);
    start();
  });
  dots.forEach(function (d, idx) {
    d.addEventListener("click", function () {
      show(idx);
      start();
    });
  });

  var menu = document.querySelector(".menu-btn");
  var bar = document.querySelector(".topbar");
  menu.addEventListener("click", function () {
    bar.classList.toggle("open");
  });

  start();
})();
