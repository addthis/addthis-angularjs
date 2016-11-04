/* globals describe, inject, beforeEach, expect, it */

'use strict';

describe('addthis service', function() {

    var $addthis;

    var validateAddThisService = function($addthis) {
        expect($addthis).toBeDefined();
        expect($addthis.add).toBeDefined();
        expect($addthis.layersRefresh).toBeDefined();
        expect($addthis.config).toBeDefined();
        expect($addthis.share).toBeDefined();
        expect($addthis.shareUrl).toBeDefined();
        expect($addthis.shareTitle).toBeDefined();
        expect($addthis.loaded).toBeDefined();
    };

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('should define $addthis provider and all its functions', function() {
        expect($addthis).toBeDefined();
        validateAddThisService($addthis);
    });
});