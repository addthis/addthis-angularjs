'use strict';

describe('appExample2 NavCtrl', function() {
    var $scope;
    var $controller;
    var controller;
    var $addthis;
    var $route;
    var $location;
    var $rootScope;
    var route1 = 'Route1';
    var route2 = 'Route2';

    beforeEach(function() {
        module('appExample2');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
        $route = $injector.get('$route');
        $location = $injector.get('$location');
        $rootScope = $injector.get('$rootScope');
        $controller = $injector.get('$controller');
        controller = $controller( 'NavCtrl', { $scope: $scope } );
    }));

    describe('$scope.path function', function () {
        it('should be defined', function () {
            expect($scope.path).toBeDefined();
        });

        it('should change routes', function () {
            $scope.path(route1);
            expect($addthis.layers_refresh).toBeDefined();
            expect($location.path()).toBe('/' + route1);

            $scope.path(route2);
            expect($location.path()).toBe('/' + route2);
        });
    });
});