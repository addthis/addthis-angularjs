var appExample1 = angular.module('appExample1', ['official.addthis']);

appExample1.config(function($addthisProvider) {
    $addthisProvider.profileId("ra-57b71bceb3ebb9df");
});

appExample1.controller('ToolSwitcherACtrl', ['$scope', function($scope) {
    var defaultTool = 'addthis_sharing_toolbox';
    var alternateTool = 'addthis_native_toolbox';
    $scope.currentTool = defaultTool;

    $scope.changeTool = function() {
        if ($scope.currentTool === defaultTool) {
            $scope.currentTool = alternateTool;
        } else {
            $scope.currentTool = defaultTool;
        }
    };
}]);

appExample1.controller('ToolSwitcherBCtrl', ['$scope', function($scope) {
    var defaultTool = 'addthis_inline_follow_toolbox';
    var alternateTool = 'addthis_sharing_toolbox';
    $scope.currentTool = defaultTool;

    $scope.changeTool = function() {
        if ($scope.currentTool === defaultTool) {
            $scope.currentTool = alternateTool;
        } else {
            $scope.currentTool = defaultTool;
        }
    };
}]);

appExample1.controller('UrlSwitcherCtrl', ['$scope', function($scope) {
    var defaultUrl = 'https://www.addthis.com';
    var alternateUrl = 'https://www.google.com';
    $scope.currentUrl = defaultUrl;

    $scope.changeUrl = function() {
        if ($scope.currentUrl === defaultUrl) {
            $scope.currentUrl = alternateUrl;
        } else {
            $scope.currentUrl = defaultUrl;
        }
    };
}]);

appExample1.controller('TitleSwitcherCtrl', ['$scope', function($scope) {
    var defaultTitle = 'This link is awesome. Check it out!';
    var alternateTitle = 'This is a good read: ';
    $scope.currentTitle = defaultTitle;

    $scope.changeTitle = function() {
        if ($scope.currentTitle === defaultTitle) {
            $scope.currentTitle = alternateTitle;
        } else {
            $scope.currentTitle = defaultTitle;
        }
    };
}]);

appExample1.controller('DynamicTitleCtrl', ['$scope', function($scope) {
    $scope.name = 'Julka';
}]);