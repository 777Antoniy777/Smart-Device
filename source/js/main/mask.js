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
