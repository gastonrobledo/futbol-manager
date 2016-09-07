'use strict';

describe('TestFrontEnd', function () {
    describe('OlapicService Test', function () {
        var $httpBackend, $olapicService, $appConfig;

        beforeEach(module(window.mainApp + '.common'));

        beforeEach(inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            $olapicService = $injector.get('OlapicService');
            $appConfig = $injector.get('AppConfig');

            $httpBackend.whenGET($appConfig.ServiceURL).respond({
                data: {
                    _embedded: {
                        media: [
                            'item 1'
                        ]
                    },
                    _links: {
                        prev: {},
                        next: {}
                    }
                }

            });
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('test get set of images', inject(function () {
            //$httpBackend.expectGET($appConfig.ServiceURL);
            $olapicService.getImages().then(function (response) {
                expect(response.data.data._embedded.media.length).toBe(1);
            });
            $httpBackend.flush();
        }));
    });
});