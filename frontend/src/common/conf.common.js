(function(angular) {
    'use strict';

    var module = window.mainApp + '.common';
    angular.registerModule(module, ['ui.bootstrap', 'ui.router', 'angularLazyImg', window.mainApp + '.config']);

})(angular);
