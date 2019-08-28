'use strict';
(function () {
  var sectionList = document.querySelector('.section__nav');
  var adressList = document.querySelector('.adress__list');
  var sectionButtonWrapper = document.querySelector('.section__wrapper');
  var adressButtonWrapper = document.querySelector('.adress__wrapper');
  var sectionButton = document.querySelector('.section__wrapper button');
  var adressButton = document.querySelector('.adress__wrapper button');

  var mediaQueryList = window.matchMedia("(max-width: 767px)");
  function handleMediaChange(evt) {
    if (evt.matches) {
      sectionList.classList.add('hidden');
      adressList.classList.add('hidden');
    } else {
      sectionList.classList.remove('hidden');
      adressList.classList.remove('hidden');
    }
  }
  mediaQueryList.addListener(handleMediaChange);
  handleMediaChange(mediaQueryList);

  if (sectionButtonWrapper) {
    sectionButtonWrapper.addEventListener('click', openAccordionListHandler);
  }

  if (adressButtonWrapper) {
    adressButtonWrapper.addEventListener('click', openAccordionListHandler);
  }

  function openAccordionListHandler(evt) {
    evt.preventDefault();
    var target = evt.target;

    if (window.matchMedia("(max-width: 767px)").matches) {

      if (target.closest('.section__wrapper')) {
        addClassToList(sectionButton, sectionList);
      }

      if (target.closest('.adress__wrapper')) {
        addClassToList(adressButton, adressList);
      }

    }

    return;
  }

  function addClassToList(buttonElem, listElem) {
    buttonElem.classList.toggle('accordion-close');
    buttonElem.classList.toggle('accordion-open');

    listElem.classList.toggle('hidden');
  }
})();

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

    body.style.overflowY = 'hidden';
    popup.classList.remove('hidden');
  }

  function closePopupHandler(evt) {
    var target = evt.target;

    if (evt.keyCode === 27 && !popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
      body.style.overflowY = 'unset';
    }

    if (target.closest('.popup__button-close') || target === popup) {
      popup.classList.add('hidden');
      body.style.overflowY = 'unset';
    }

    return;
  }
})();
