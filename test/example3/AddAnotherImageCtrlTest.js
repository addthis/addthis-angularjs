describe('appExample3 AddAnotherImageCtrl', function() {
   'use strict';

    var $httpBackend;
    var $scope;
    var theCatApiUrl = 'https://thecatapi.com/api/images/get?format=xml&results_per_page=20&size=med&type=gif';
    var theCatApiResponse = '<?xml version="1.0"?>\n' +
        '<response>\n' +
        '  <data>\n' +
        '    <images>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=3hq&amp;size=med</url>\n' +
        '        <id>3hq</id>\n' +
        '        <source_url>http://thecatapi.com/?id=3hq</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=81p&amp;size=med</url>\n' +
        '        <id>81p</id>\n' +
        '        <source_url>http://thecatapi.com/?id=81p</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4rt&amp;size=med</url>\n' +
        '        <id>4rt</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4rt</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=b7r&amp;size=med</url>\n' +
        '        <id>b7r</id>\n' +
        '        <source_url>http://thecatapi.com/?id=b7r</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=83k&amp;size=med</url>\n' +
        '        <id>83k</id>\n' +
        '        <source_url>http://thecatapi.com/?id=83k</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4il&amp;size=med</url>\n' +
        '        <id>4il</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4il</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=41f&amp;size=med</url>\n' +
        '        <id>41f</id>\n' +
        '        <source_url>http://thecatapi.com/?id=41f</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=48k&amp;size=med</url>\n' +
        '        <id>48k</id>\n' +
        '        <source_url>http://thecatapi.com/?id=48k</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4h2&amp;size=med</url>\n' +
        '        <id>4h2</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4h2</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=33i&amp;size=med</url>\n' +
        '        <id>33i</id>\n' +
        '        <source_url>http://thecatapi.com/?id=33i</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=8vj&amp;size=med</url>\n' +
        '        <id>8vj</id>\n' +
        '        <source_url>http://thecatapi.com/?id=8vj</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=897&amp;size=med</url>\n' +
        '        <id>897</id>\n' +
        '        <source_url>http://thecatapi.com/?id=897</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4lf&amp;size=med</url>\n' +
        '        <id>4lf</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4lf</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=cme&amp;size=med</url>\n' +
        '        <id>cme</id>\n' +
        '        <source_url>http://thecatapi.com/?id=cme</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=584&amp;size=med</url>\n' +
        '        <id>584</id>\n' +
        '        <source_url>http://thecatapi.com/?id=584</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=3p1&amp;size=med</url>\n' +
        '        <id>3p1</id>\n' +
        '        <source_url>http://thecatapi.com/?id=3p1</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4ec&amp;size=med</url>\n' +
        '        <id>4ec</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4ec</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=agc&amp;size=med</url>\n' +
        '        <id>agc</id>\n' +
        '        <source_url>http://thecatapi.com/?id=agc</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4h4&amp;size=med</url>\n' +
        '        <id>4h4</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4h4</source_url>\n' +
        '      </image>\n' +
        '      <image>\n' +
        '        <url>https://thecatapi.com/api/images/get.php?id=4ir&amp;size=med</url>\n' +
        '        <id>4ir</id>\n' +
        '        <source_url>http://thecatapi.com/?id=4ir</source_url>\n' +
        '      </image>\n' +
        '    </images>\n' +
        '  </data>\n' +
        '</response>\n';
    var theCatApiRequestHandler;

    beforeEach(function() {
        module('appExample3');
        $scope = {};
    });

    beforeEach(inject(function($injector) {
        var $controller = $injector.get('$controller');
        $httpBackend = $injector.get('$httpBackend');

        theCatApiRequestHandler = $httpBackend.when('GET', theCatApiUrl)
        .respond(200, theCatApiResponse);

        $httpBackend.when('GET', 'ExampleList.html').respond({});

        $controller('AddAnotherImageCtrl', { $scope: $scope });

        $httpBackend.expectGET(theCatApiUrl);
        $httpBackend.expectGET('ExampleList.html').respond(200);
        $httpBackend.flush();
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

  it('should initialize with arrays for imageQueue and shownImages', function() {
    expect(Array.isArray($scope.imageQueue)).toBe(true);
    expect(Array.isArray($scope.shownImages)).toBe(true);
  });

    it('should have an image queue with more than zero items', function() {
        expect($scope.imageQueue.length).toBeGreaterThan(0);
    });

    it('should initialize with one visible image', function() {
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