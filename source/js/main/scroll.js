'use strict';
(function () {
  var intro = document.querySelector('.introduction');
  var scrollButton = document.querySelector('#btn-scroll');

  if (intro && scrollButton) {
    scrollButton.addEventListener('click', scrollIntro);
  }

  function scrollIntro(evt) {
    evt.preventDefault();

    var introSize = intro.getBoundingClientRect();

    window.scrollTo({
      top: introSize.height,
      left: 0,
      behavior: 'smooth'
    });
  }
})();
