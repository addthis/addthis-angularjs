'use strict';

describe('appExample2 routes', function() {
    var $addthis;
    var $route;

    beforeEach(function() {
        module('appExample2');
    });


    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
        $route = $injector.get('$route');
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