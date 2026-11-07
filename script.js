(function () {
  var track = document.querySelector(".track");
  var imgs = Array.prototype.slice.call(track.children);
  var index = 0;
  var timer;
  var hold = 2600;
  var busy = false;

  function widths() {
    return imgs.map(function (img) { return img.getBoundingClientRect().width; });
  }

  function offset(i) {
    return widths().slice(0, i).reduce(function (sum, w) { return sum + w; }, 0);
  }

  function go(i, animate) {
    track.style.transition = animate ? "transform 0.9s ease" : "none";
    track.style.transform = "translateX(-" + offset(i) + "px)";
  }

  function queue() {
    clearTimeout(timer);
    timer = setTimeout(step, hold);
  }

  function step() {
    if (busy) return;
    busy = true;
    index += 1;
    go(index, true);
  }

  track.addEventListener("transitionend", function (e) {
    if (e.propertyName !== "transform") return;
    if (index >= imgs.length - 1) {
      index = 0;
      go(0, false);
    }
    busy = false;
    queue();
  });

  function start() {
    var clone = imgs[0].cloneNode(true);
    clone.alt = "";
    clone.setAttribute("aria-hidden", "true");
    track.appendChild(clone);
    imgs.push(clone);
    go(0, false);
    queue();
  }

  var pending = imgs.filter(function (img) { return !img.complete; });
  if (!pending.length) start();
  else {
    var left = pending.length;
    pending.forEach(function (img) {
      img.addEventListener("load", function () {
        left -= 1;
        if (left === 0) start();
      });
      img.addEventListener("error", function () {
        left -= 1;
        if (left === 0) start();
      });
    });
  }

  var slider = document.querySelector(".slider");
  slider.addEventListener("mouseenter", function () { clearTimeout(timer); });
  slider.addEventListener("mouseleave", function () { if (!busy) queue(); });

  var menu = document.querySelector(".menu-btn");
  var bar = document.querySelector(".topbar");
  menu.addEventListener("click", function () {
    bar.classList.toggle("open");
  });
})();
