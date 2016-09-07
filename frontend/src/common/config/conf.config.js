(function(angular) {
    'use strict';

    var module = window.mainApp + '.config';
    angular.registerModule(module, [])
        .provider('AppConfig', GlobalConfiguration);


    function GlobalConfiguration() {
        var globals = {
            'ServiceURL': 'some api endpoint'
        };
        return {
            getItem: function (key) {
                return globals[key];
            },
            $get: function () {
                return globals;
            }
        };
    }



})(angular);
