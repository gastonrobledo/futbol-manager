(function(angular){
    'use strict';

    var module = window.mainApp + '.common';
    angular.module(module)
        .factory('OlapicService', olapicService);

    olapicService.$inject = ['$http', 'AppConfig'];

    function olapicService($http, AppConfig){
        return{
            'getImages': function(url){
                var urlData = url || AppConfig.ServiceURL;
                return $http({
                    url: urlData,
                    type: 'GET'
                });
            }
        };

    }

})(angular);
