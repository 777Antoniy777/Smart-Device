'use strict';
(function () {
  var body = document.querySelector('body');
  var popupButton = document.querySelector('.header-nav__link--popup');
  var popup = document.querySelector('.popup');

  if (popupButton) {
    popupButton.addEventListener('click', openPopupHandler);
  }

  if (popup) {
    popup.addEventListener('click', closePopupHandler);
  }

  window.addEventListener('keydown', closePopupHandler);

  function openPopupHandler(evt) {
    evt.preventDefault();

    body.style.overflow = 'hidden';
    popup.classList.remove('hidden');
  }

  function closePopupHandler(evt) {
    var target = evt.target;

    if (evt.keyCode === 27 && !popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
      body.style.overflow = 'unset';
    }

    if (target.closest('.popup__button-close') || target === popup) {
      popup.classList.add('hidden');
      body.style.overflow = 'unset';
    }

    return;
  }
})();
