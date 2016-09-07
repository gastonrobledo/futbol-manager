(function (angular) {
    'use strict';
    //Define Main Module name
    window.mainApp = 'futbol_manager';


    // Add a new vertical module registration
    angular.registerModule = function (moduleName, dependencies) {
        // Create angular module
        angular.module(moduleName, dependencies);

        // Add the module to the AngularJS configuration file
        var exists = _.includes(angular.module(window.mainApp).requires, moduleName);
        if (!exists) {
            angular.module(window.mainApp).requires.push(moduleName);
        }
        return angular.module(moduleName);
    };


    angular.module(window.mainApp, [
        'templates-app',
        'templates-common',
        'ui.bootstrap',
        'ui.router',
        'ngAnimate'
    ])
        .config(Config)
        .controller('AppController', AppController);

    // Add Injection for Config method
    Config.$inject = ['$httpProvider', '$locationProvider', '$urlRouterProvider'];

    /**
     * Configuration function for the App
     *
     * @param httpProvider
     * @param locationProvider
     * @param urlRouterProvider
     * @constructor
     */
    function Config(httpProvider, locationProvider, urlRouterProvider) {
        //uncomment if you want to use html5 mode.
        locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        }).hashPrefix('!');

        httpProvider.defaults.useXDomain = true;
        delete httpProvider.defaults.headers.common['X-Requested-With'];

        urlRouterProvider.otherwise('/');
    }

    // Add injections for AppController
    AppController.$inject = ['$rootScope', '$scope', '$state'];

    /**
     * AppController main controller of the app
     * @param $scope
     * @constructor
     */
    function AppController($rootScope, $scope, $state) {
        $scope.$on('$stateChangeSuccess', function (event, toState) {
            $scope.pageTitle = toState.data.pageTitle;
            $scope.state = $state.$current.name;
        });
    }

    //Then define the init function for starting up the application
    angular.element(document).ready(function () {
        //Fixing facebook bug with redirect
        if (window.location.hash === '#_=_') {
            window.location.hash = '';
        }

        //Then init the app
        angular.bootstrap(document, [window.mainApp]);
    });

})(angular);