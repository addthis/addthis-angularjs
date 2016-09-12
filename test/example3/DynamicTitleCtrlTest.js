'use strict';

describe('appExample3 DynamicTitleCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;
    var initialName = 'Julka';

    beforeEach(function() {
        module('appExample3');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        controller = $controller('DynamicTitleCtrl', { $scope: $scope });
    }));

    it('should initialize with initial name value', function() {
        expect($scope.name).toBe(initialName);
    });
});