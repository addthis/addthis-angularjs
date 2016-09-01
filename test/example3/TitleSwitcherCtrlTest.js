'use strict';

describe('appExample3 TitleSwitcherCtrl', function() {
    var $controller;
    var $scope = {};
    var controller;
    var initialTitle = 'This link is awesome. Check it out!';
    var alternateTitle = 'This is a good read:';

    beforeEach(function() {
        module('appExample3');
    });

    beforeEach(inject(function(_$controller_){
        $controller = _$controller_;
        $scope = {};
        controller = $controller('TitleSwitcherCtrl', { $scope: $scope });
    }));
});