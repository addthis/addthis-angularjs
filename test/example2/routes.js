'use strict';

describe('appExample2 routes', function() {
    var $controller;
    var $addthis;
    var $route;
    var $location;
    var $rootScope;

    beforeEach(function() {
        module('appExample2');
    });

    beforeEach(inject(function (_$addthis_, _$route_, _$location_, _$rootScope_) {
        $addthis = _$addthis_;
        $route = _$route_;
        $location = _$location_;
        $rootScope = _$rootScope_;
    }));

    describe('$addthis service', function () {
        it('should run successfully', function () {
            expect($addthis).toBeDefined();
        });
    });

    describe('$route service', function () {
        it('should run successfully', function () {
            expect($route).toBeDefined();
        });
    });

    describe('$location service', function () {
        it('should run successfully', function () {
            expect($location).toBeDefined();
        });
    });

    describe('$rootScope service', function () {
        it('should run successfully', function () {
            expect($rootScope).toBeDefined();
        });
    });

    describe('routes', function () {
        it('should be defined', function () {
            expect($route.routes['/Route1']).toBeDefined();
            expect($route.routes['/Route2']).toBeDefined();
        });

        it('should have templateUrl defined', function () {
            expect($route.routes['/Route1'].templateUrl).toBeDefined();
            expect($route.routes['/Route2'].templateUrl).toBeDefined();
        });
    });
});