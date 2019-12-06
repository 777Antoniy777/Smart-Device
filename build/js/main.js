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
      sectionList.classList.remove('no-js');
      adressList.classList.remove('no-js');
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

    if (listElem.style.maxHeight) {
      listElem.style.maxHeight = null;
    } else {
      listElem.style.maxHeight = listElem.scrollHeight + 'px';
    }

    buttonElem.classList.toggle('accordion-close');
    buttonElem.classList.toggle('accordion-open');
  }
})();

'use strict';
var bLazy = new Blazy({
  selector: 'img[class~="b-lazy"]',
});

'use strict';
(function () {
  var inputPhone = document.querySelector('#phone');
  var popupInputPhone = document.querySelector('#popup-phone');
  var maskOptions = {
    mask: '+{7}(000)000-00-00'
  };
  var mask = IMask(inputPhone, maskOptions);
  var mask = IMask(popupInputPhone, maskOptions);
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

    body.style.overflow = 'hidden';
    popup.classList.remove('hidden');
  }

  function closePopupHandler(evt) {
    var target = evt.target;

    if (evt.keyCode === 27 && !popup.classList.contains('hidden')) {
      popup.classList.add('hidden');
      body.style.overflow = 'auto';
    }

    if (target.closest('.popup__button-close') || target === popup) {
      popup.classList.add('hidden');
      body.style.overflow = 'auto';
    }

    return;
  }
})();

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
