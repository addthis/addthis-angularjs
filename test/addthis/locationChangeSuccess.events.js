/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('$locationChangeSuccess events', function() {
    var $addthis;
    var $rootScope;

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
        $rootScope = $injector.get('$rootScope');
        spyOn($addthis, 'layers_refresh').and.callThrough();
    }));

    it('should not be called if location did not change', function() {
        $rootScope.$broadcast('$locationChangeSuccess');
        $rootScope.$digest();
        expect($addthis.layers_refresh).not.toHaveBeenCalled();
    });

    it('should not be called if location did not change', function() {
        $rootScope.$broadcast('$locationChangeSuccess', 'a', 'b');
        $rootScope.$digest();
        expect($addthis.layers_refresh).toHaveBeenCalled();
    });
});