'use strict';

describe('AppController', function() {
    describe('isCurrentUrl', function() {
        var AppCtrl, $location, $scope;

        beforeEach(module(window.mainApp));

        beforeEach(inject(function($controller, _$location_, $rootScope) {
            $location = _$location_;
            $scope = $rootScope.$new();
            AppCtrl = $controller('AppController', {
                $scope: $scope
            });
        }));

        it('should pass a dummy test', inject(function() {
            expect(true).toBe(true);
        }));
    });
});