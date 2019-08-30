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
