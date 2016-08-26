var appExample2 = angular.module(
    'appExample2',
    ['ngRoute', 'official.addthis']
);

appExample2.config(function($routeProvider) {
    $routeProvider
    .when('/Route1', {
        templateUrl: 'Route1.html'
    })
    .when('/Route2', {
        templateUrl: 'Route2.html'
    });
});

appExample2.config(function($addthisProvider) {
    $addthisProvider.profileId('ra-57b71bceb3ebb9df');
});

appExample2.controller('NavCtrl',
    [
        '$scope',
        '$location',
        function($scope, $location) {
            $scope.path = function(view) {
                $location.path(view); // path not hash
            };
        }
    ]
);