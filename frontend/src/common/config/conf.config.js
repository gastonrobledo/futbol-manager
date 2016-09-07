(function(angular) {
    'use strict';

    var module = window.mainApp + '.config';
    angular.registerModule(module, [])
        .provider('AppConfig', GlobalConfiguration);


    function GlobalConfiguration() {
        var globals = {
            'ServiceURL': 'https://api.olapic.com/customers/215757/media/recent?count=15&auth_token=0a40a13fd9d531110b4d6515ef0d6c529acdb59e81194132356a1b8903790c18&version=v2.2'
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
