(function (angular) {
    'use strict';

    var module = window.mainApp + '.common';
    angular.module(module)
        .directive('gallery', gallery)
        .controller('lightBoxController', lightBoxController);



    lightBoxController.$inject = ['$scope', '$uibModalInstance', 'image'];

    function lightBoxController($scope, $uibModalInstance, image){
        $scope.image = image;

        $scope.close = function(){
            $uibModalInstance.close();
        };
    }

    galleryController.$inject = ['$scope', '$uibModal', 'OlapicService'];

    function galleryController($scope, $uibModal, OlapicService) {
        $scope.rows = [];

        $scope.showDetails = function (img) {
            $uibModal.open({
                animation: true,
                backdrop: true,
                templateUrl: 'directives/gallery/ligthbox.tpl.html',
                controller: 'lightBoxController',
                resolve: {
                    image: function () {
                        return img;
                    }
                }
            });
        };

        $scope.loadNext = function () {
            if ($scope.pages) {
                $scope.loadData($scope.pages.next.href);
            }
        };

        $scope.loadPrev = function () {
            if ($scope.pages) {
                $scope.loadData($scope.pages.prev.href);
            }
        };

        $scope.loadData = function (url) {
            $scope.rows = [];
            OlapicService.getImages(url).then(function (response) {
                if (response.data.data._embedded.media) {
                    $scope.previous = url;
                    $scope.pages = response.data.data._links;
                    processImages(angular.copy(response.data.data._embedded.media));
                } else {
                    //Since is no data previous, load the page before.
                    $scope.loadData($scope.previous);
                }
            });
        };

        function processImages(images) {
            // Order items by likes and remove duplicates
            var imgs = _.sortByOrder(_.uniq(images), ['likes'], ['desc']);
            // take the three most important and show them bigger
            var moreLiked = imgs.splice(0, 3);
            //adding items to rows.
            $scope.rows.push({
                'items': [
                    imgs.splice(0, 3),
                    imgs.splice(0, 3)
                ]
            });
            $scope.rows.push({
                'items': [
                    [moreLiked[0]],
                    [moreLiked[1]],
                    [moreLiked[2]]
                ]
            });
            $scope.rows.push({
                'items': [
                    imgs.splice(0, 3),
                    imgs.splice(0, 3)
                ]
            });
        }
    }

    function gallery() {
        return {
            restrict: 'E',
            templateUrl: 'directives/gallery/gallery.tpl.html',
            controller: galleryController,
            link: function (scope) {
                scope.loadData();
            }
        };
    }

})(angular);
