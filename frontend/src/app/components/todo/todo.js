(function(angular) {
    'use strict';

    /**
     * Each section of the site has its own module. It probably also has
     * submodules, though this boilerplate is too simple to demonstrate it. Within
     * `src/app/home`, however, could exist several additional folders representing
     * additional modules that would then be listed as dependencies of this one.
     * For example, a `note` section could have the submodules `note.create`,
     * `note.delete`, `note.edit`, etc.
     *
     * Regardless, so long as dependencies are managed correctly, the build process
     * will automatically take take of the rest.
     *
     * The dependencies block here is also where component dependencies should be
     * specified, as shown below.
     */
    var module = window.mainApp + '.todo';
    angular.registerModule(module)

    /**
     * Each section or module of the site can also have its own routes. AngularJS
     * will handle ensuring they are all available at run-time, but splitting it
     * this way makes each module more "self-contained".
     */.config(Config)
        .controller('TodoEditController', TodoEditController)
        .controller('TodoController', TodoController);

    Config.$inject = ['$stateProvider'];

    function Config($stateProvider) {
        $stateProvider.state('todo', {
            url: '/todo',
            views: {
                'main': {
                    controller: 'TodoController as Ctrl',
                    templateUrl: 'components/todo/todo.tpl.html'
                }
            },
            data: {
                pageTitle: 'Olapic Test'
            }
        }).state('todo.edit', {
            url: '/:idx',
            views: {
                'main': {
                    controller: 'TodoEditController as Ctrl',
                    templateUrl: 'components/todo/todo-edit.tpl.html'
                }
            },
            data: {
                pageTitle: 'Olapic Test'
            }
        });
    }


    /**
     * HomeController
     * @constructor
     */
    TodoController.$inject = ['$rootScope'];
    function TodoController($rootScope) {
        //Do Somehting
        var vm = this;

    }

    TodoEditController.$inject = ['$stateParams', '$rootScope'];
    function TodoEditController($stateParams, $rootScope) {
        //Do Somehting
        var vm = this;

        if($stateParams.idx){
            vm.selectedTodo = $rootScope.todos[$stateParams.idx];
        }


    }

})(angular);