describe('appExample3 AddAnotherImageCtrl', function() {
   'use strict';

    var $controller;
    var $addthis;
    var $httpBackend;
    var $scope = {};
    var controller;
    var theCatApiUrl = 'https://thecatapi.com/api/images/get?format=xml&results_per_page=20&size=med&type=gif';
    var theCatApiResponse = '<response>\n<data>\n<images>\n<image>\n<url>\nhttps://thecatapi.com/api/images/get.php?id=1aq&size=med\n</url>\n<id>1aq</id>\n<source_url>http://thecatapi.com/?id=1aq</source_url>\n</image>\n<image>\n<url>\nhttps://thecatapi.com/api/images/get.php?id=MTUwNTk4NQ&size=med\n</url>\n<id>MTUwNTk4NQ</id>\n<source_url>http://thecatapi.com/?id=MTUwNTk4NQ</source_url>\n</image>\n<image>\n<url>\nhttps://thecatapi.com/api/images/get.php?id=7v&size=med\n</url>\n<id>7v</id>\n<source_url>http://thecatapi.com/?id=7v</source_url>\n</image>\n</data>\n</response>';
    var theCatApiRequestHandler;

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_){
        $controller = _$controller_;
        $scope = {};
        $httpBackend = _$httpBackend_;

        theCatApiRequestHandler = $httpBackend.when('GET', theCatApiUrl)
        .respond(200, theCatApiResponse);

        $httpBackend.when('GET', 'ExampleList.html').respond({});

        controller = $controller('AddAnotherImageCtrl', { $scope: $scope });

        $httpBackend.expectGET(theCatApiUrl);
        $httpBackend.expectGET('ExampleList.html').respond(200);
        $httpBackend.flush();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have an image queue', function() {
        expect(Array.isArray($scope.shownImages)).toBe(true);
        expect($scope.imageQueue.length).toBeGreaterThan(0);
    });

    it('should initialize with one visible image', function() {
        expect(Array.isArray($scope.shownImages)).toBe(true);
        expect($scope.shownImages.length).toBe(1);
    });

    it('should initialize with a string in $scope.currentImageUrl', function() {
        expect(typeof $scope.currentImageUrl).toBe('string');
    });

    describe('addAnother()', function() {
        it('should move images from the queue into the visible list', function() {
            var totalImages = $scope.imageQueue.length + $scope.shownImages.length;
            $scope.addAnother();
            expect(Array.isArray($scope.shownImages)).toBe(true);
            expect($scope.shownImages.length).toBe(2);
            expect($scope.imageQueue.length).toBe(totalImages - $scope.shownImages.length);
        });

        it('should ask for more images from thecatapi when the queue is empty', function() {
            var totalImages = $scope.imageQueue.length + $scope.shownImages.length;

            while ($scope.imageQueue.length > 0) {
                $scope.addAnother();
            }

            expect($scope.shownImages.length).toBe(totalImages);
            expect($scope.imageQueue.length).toBe(0);

            $httpBackend.expectGET(theCatApiUrl);
            $scope.addAnother();
            $httpBackend.flush();

            expect(totalImages).not.toBe($scope.imageQueue.length + $scope.shownImages.length);
            expect($scope.imageQueue.length).not.toBe(0);
        });

        it('should change the value in $scope.currentImageUrl', function() {
            var value1 = $scope.currentImageUrl;
            $scope.addAnother();
            var value2 = $scope.currentImageUrl;
            expect(value1).not.toBe(value2);
            $scope.addAnother();
            var value3 = $scope.currentImageUrl;
            expect(value2).not.toBe(value3);
        });
    });
});