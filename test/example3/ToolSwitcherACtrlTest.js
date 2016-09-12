'use strict';

describe('appExample3 ToolSwitcherACtrl', function() {
    var $scope;
    var initialTool = 'addthis_sharing_toolbox';
    var alternateTool = 'addthis_native_toolbox';

    beforeEach(function() {
        module('appExample3');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        var controller = $controller('ToolSwitcherACtrl', { $scope: $scope });
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