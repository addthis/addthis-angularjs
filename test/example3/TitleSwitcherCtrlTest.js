'use strict';

describe('appExample3 TitleSwitcherCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;
    var initialTitle = 'This link is awesome. Check it out!';
    var alternateTitle = 'This is a good read:';

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
        controller = $controller('TitleSwitcherCtrl', { $scope: $scope });
    }));

    it('should initialize with share title with its initial value', function() {
        expect($scope.currentTitle).toBe(initialTitle);
    });

    describe('changeTitle', function() {
        it('should change the share title to its alternate value when executed once', function() {
            $scope.changeTitle();
            expect($scope.currentTitle).toBe(alternateTitle);
        });

        it('should change the share title to its default value when executed twice', function() {
            $scope.changeTitle();
            $scope.changeTitle();
            expect($scope.currentTitle).toBe(initialTitle);
        });
    });
});