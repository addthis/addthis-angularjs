'use strict';

describe('appExample3 ToolSwitcherBCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;
    var initialTool = 'addthis_inline_follow_toolbox';
    var alternateTool = 'addthis_sharing_toolbox';

    beforeEach(function() {
        module('appExample3');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        $controller = $injector.get('$controller');
        controller = $controller('ToolSwitcherBCtrl', { $scope: $scope });
    }));

    it('should initialize with tool name with its initial value', function() {
        expect($scope.currentTool).toBe(initialTool);
    });

    describe('changeTitle', function() {
        it('should change the tool name to its alternate value when executed once', function() {
            $scope.changeTool();
            expect($scope.currentTool).toBe(alternateTool);
        });

        it('should change the tool name to its default value when executed twice', function() {
            $scope.changeTool();
            $scope.changeTool();
            expect($scope.currentTool).toBe(initialTool);
        });
    });
});