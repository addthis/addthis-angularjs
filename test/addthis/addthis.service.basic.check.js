/* globals describe, inject, beforeEach, expect, it */

'use strict';

var $addthis;

var validateAddThisService = function($addthis) {
    expect($addthis).toBeDefined();
    expect($addthis.add).toBeDefined();
    expect($addthis.layers_refresh).toBeDefined();
    expect($addthis.config).toBeDefined();
    expect($addthis.share).toBeDefined();
    expect($addthis.share_url).toBeDefined();
    expect($addthis.share_title).toBeDefined();
    expect($addthis.loaded).toBeDefined();
};

describe('addthis module', function() {
    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('should define $addthis provider and all its functions', function() {
        expect($addthis).toBeDefined();
        validateAddThisService($addthis);
    });
});