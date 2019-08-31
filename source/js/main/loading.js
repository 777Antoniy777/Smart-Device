/* eslint-disable */
'use strict';
document.addEventListener("DOMContentLoaded", function () {
  var lazyImages = [].slice.call(document.querySelectorAll('.services__list img'));
  var active = false;

  var lazyLoad = function lazyLoad() {
    if (active === false) {
      active = true;
      setTimeout(function () {
        lazyImages.forEach(function (lazyImage) {

          if (lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0 && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.getAttribute('data-src');
            lazyImage.srcset = lazyImage.getAttribute('data-srcset');

            var source = lazyImage.previousElementSibling;

            if (source) {
              source.srcset = source.getAttribute('data-srcset');
            }

            lazyImages = lazyImages.filter(function (image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });
        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
