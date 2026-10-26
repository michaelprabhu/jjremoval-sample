/* Progressive enhancement only: native links and all page content work without JavaScript. */
(function () {
  "use strict";

  var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a[href^="#"]'));
  if (!links.length || typeof IntersectionObserver === "undefined") return;

  var sections = links.map(function (link) {
    return document.querySelector(link.getAttribute("href"));
  }).filter(Boolean);

  var observer = new IntersectionObserver(function (entries) {
    var current = entries.filter(function (entry) {
      return entry.isIntersecting;
    }).sort(function (a, b) {
      return a.boundingClientRect.top - b.boundingClientRect.top;
    })[0];

    if (!current) return;
    links.forEach(function (link) {
      if (link.hash === "#" + current.target.id) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }, { rootMargin: "-15% 0px -70% 0px", threshold: 0 });

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
