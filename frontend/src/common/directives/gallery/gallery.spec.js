'use strict';

describe('TestFrontEnd', function () {
    describe('OlapicService Test', function () {
        var $olapicServiceMock, $templateCache, $appConfig, $compile, $rootScope, $q;

        beforeEach(module(window.mainApp + '.common'));
        beforeEach(module('directives/gallery/gallery.tpl.html'));


        beforeEach(module(function ($provide) {

            $olapicServiceMock = {
                getImages: function () {
                    var defer = $q.defer();
                    defer.resolve({
                        data: {
                            data: {
                                _embedded: {
                                    media: createImagesObject()
                                },
                                _links: {
                                    prev: {
                                        href: $appConfig.ServiceURL
                                    },
                                    next: {
                                        href: $appConfig.ServiceURL
                                    }
                                }
                            }
                        }
                    });
                    return defer.promise;
                }
            };
            $provide.value('OlapicService', $olapicServiceMock);
        }));

        beforeEach(inject(function ($injector) {
            $compile = $injector.get('$compile');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $appConfig = $injector.get('AppConfig');
            $templateCache = $injector.get('$templateCache');

            var template = $templateCache.get('directives/gallery/gallery.tpl.html');
            $templateCache.put('directives/gallery/gallery.tpl.html',template);

        }));

        function createImagesObject() {
            var images = [];
            for (var i = 0; i < 15; i++) {
                images.push({
                    _embedded: {
                        uploader: {
                            name: 'name ' + (i + 1),
                            username: 'username ' + (i + 1)
                        }
                    },
                    caption: 'my super caption ' + (i + 1),
                    date_published: '2015-10-23T11:24:52+00:00',
                    images: {
                        mobile: '/assets/images/loading.svg',
                        normal: '/assets/images/loading.svg',
                        original: '/assets/images/loading.svg',
                        square: '/assets/images/loading.svg',
                        thumbnail: '/assets/images/loading.svg'
                    },
                    likes: Math.floor((Math.random() * 500) + 1),
                    location: null
                });
            }
            return images;
        }

        it('test gallery directive', inject(function () {

            var element = angular.element('<gallery></gallery>');
            var compiledElement = $compile(element)($rootScope);
            $rootScope.$digest();

            //check rows
            var rows = compiledElement.find('.row');
            expect(3).toBe(rows.length);

            //check images per row
            expect(6).toBe(angular.element(rows[0]).find('img').length);
            expect(3).toBe(angular.element(rows[1]).find('img').length);
            expect(6).toBe(angular.element(rows[2]).find('img').length);

        }));
    });
});