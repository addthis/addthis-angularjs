'use strict';

describe('appExample3 AddThisShareChangesCtrl', function() {
    var $state;
    var $scope;
    var initialUrl = 'https://www.addthis.com';
    var alternateUrl = 'https://www.google.com';
    var initialTitle = 'This link is awesome. Check it out!';
    var alternateTitle = 'This is a good read:';

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $state = $injector.get('$state');

        var $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        var controller = $controller('AddThisShareChangesCtrl', { $scope: $scope });
    }));

    afterEach(function() {
        window.addthis_share = undefined;
        window.addthis_config = undefined;
        window.addthis_plugin_info = undefined;
    })

    it('should initialize with share-url with its initial value', function() {
        expect($scope.currentUrl).toBe(initialUrl);
        expect(window.addthis_share.url).toBe(initialUrl);
    });

    describe('changeUrl', function() {
        it('should change the share-url to its alternate value when executed once', function() {
            $scope.changeUrl();
            expect($scope.currentUrl).toBe(alternateUrl);
            expect(window.addthis_share.url).toBe(alternateUrl);
        });

        it('should change the share-url to its default value when executed twice', function() {
            $scope.changeUrl();
            $scope.changeUrl();
            expect($scope.currentUrl).toBe(initialUrl);
            expect(window.addthis_share.url).toBe(initialUrl);
        });
    });

    it('should initialize with share-title with its initial value', function() {
        expect($scope.currentTitle).toBe(initialTitle);
        expect(window.addthis_share.title).toBe(initialTitle);
    });

    describe('changeTitle', function() {
        it('should change the share-title to its alternate value when executed once', function() {
            $scope.changeTitle();
            expect($scope.currentTitle).toBe(alternateTitle);
            expect(window.addthis_share.title).toBe(alternateTitle);
        });

        it('should change the share-title to its default value when executed twice', function() {
            $scope.changeTitle();
            $scope.changeTitle();
            expect($scope.currentTitle).toBe(initialTitle);
            expect(window.addthis_share.title).toBe(initialTitle);
        });
    });

    describe('on broadcase of locationChangeStart change', function() {
        it('should clean addthis_share settings up if state changed', function() {
            expect(window.addthis_share.url).toBe(initialUrl);
            expect(window.addthis_share.title).toBe(initialTitle);
            $scope.$broadcast('$locationChangeStart', 0, 1);
            expect(window.addthis_share.url).toBe(false);
            expect(window.addthis_share.title).toBe(false);
        });

        it('should do nothing if state did not change', function() {
            expect(window.addthis_share.url).toBe(initialUrl);
            expect(window.addthis_share.title).toBe(initialTitle);
            $scope.$broadcast('$locationChangeStart', 1, 1);
            expect(window.addthis_share.url).toBe(initialUrl);
            expect(window.addthis_share.title).toBe(initialTitle);
        });
    });
});