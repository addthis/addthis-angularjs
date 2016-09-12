'use strict';

describe('appExample3 DynamicTitleCtrl', function() {
    var $scope;
    var initialName = 'Julka';

    beforeEach(function() {
        module('appExample3');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var controller = $controller('DynamicTitleCtrl', { $scope: $scope });
    }));

    it('should initialize with initial name value', function() {
        expect($scope.name).toBe(initialName);
    });
});