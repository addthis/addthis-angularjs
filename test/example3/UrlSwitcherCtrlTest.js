'use strict';

describe('appExample3 UrlSwitcherCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;
    var initialUrl = 'https://www.addthis.com';
    var alternateUrl = 'https://www.google.com';

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
        controller = $controller('UrlSwitcherCtrl', { $scope: $scope });
    }));

    it('should initialize with share-url with its initial value', function() {
        expect($scope.currentUrl).toBe(initialUrl);
    });

    describe('changeUrl', function() {
        it('should change the share-url to its alternate value when executed once', function() {
            $scope.changeUrl();
            expect($scope.currentUrl).toBe(alternateUrl);
        });

        it('should change the share-url to its default value when executed twice', function() {
            $scope.changeUrl();
            $scope.changeUrl();
            expect($scope.currentUrl).toBe(initialUrl);
        });
    });
});