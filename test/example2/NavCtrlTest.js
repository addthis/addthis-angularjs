'use strict';

describe('appExample2 NavCtrl', function() {
    var $scope;
    var $controller;
    var $addthis;
    var $route;
    var $location;
    var $rootScope;
    var route1 = 'Route1';
    var route2 = 'Route2';

    beforeEach(function() {
        module('appExample2');
    });

    beforeEach(inject(function (_$addthis_, _$route_, _$location_, _$rootScope_) {
        $addthis = _$addthis_;

        $route = _$route_;
        $location = _$location_;
        $rootScope = _$rootScope_;
    }));

    beforeEach(inject(function(_$controller_){
        $scope = {};
        $controller = _$controller_(
            'NavCtrl',
            {
                $scope: $scope//,
                //$addthis: $addthis
            }
        );
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