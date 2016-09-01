'use strict';

describe('appExample3 AddAnotherIpsumCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
        controller = $controller('AddAnotherIpsumCtrl', { $scope: $scope });
    }));

    it('should have an ipsum queue', function() {
        expect(Array.isArray($scope.queuedIpsums)).toBe(true);
        expect($scope.queuedIpsums.length).toBeGreaterThan(0);
    });

    it('should initialize with one visible ipsum', function() {
        expect(Array.isArray($scope.shownIpsums)).toBe(true);
        expect($scope.shownIpsums.length).toBe(1);
    });

    describe('addAnother()', function() {
        it('should move ipsums from the queue into the visible list', function() {
            var totalIpsums = $scope.queuedIpsums.length + $scope.shownIpsums.length;

            $scope.addAnother();

            expect(Array.isArray($scope.shownIpsums)).toBe(true);
            expect($scope.shownIpsums.length).toBe(2);
            expect($scope.queuedIpsums.length).toBe(totalIpsums - $scope.shownIpsums.length);
        });

        it('should stop adding ipsums when the queue is empty', function() {
            var totalIpsums = $scope.queuedIpsums.length + $scope.shownIpsums.length;

            while ($scope.queuedIpsums.length > 0) {
                $scope.addAnother();
            }

            expect($scope.shownIpsums.length).toBe(totalIpsums);
            expect($scope.queuedIpsums.length).toBe(0);

            $scope.addAnother();

            expect($scope.shownIpsums.length).toBe(totalIpsums);
            expect($scope.queuedIpsums.length).toBe(0);
        });
    });
});