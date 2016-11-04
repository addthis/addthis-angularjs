/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('setup', function() {
    var $addthis;

    var findAddThisScriptOnPage = function(header) {
        var addthisWidgetSelector;
        if (header === true) {
            addthisWidgetSelector = 'script[src*="addthis_widget.js"]';
        } else {
            addthisWidgetSelector = 'body script[src*="addthis_widget.js"]';
        }

        var matches = document.querySelectorAll(addthisWidgetSelector);
        return matches;
    };

    describe('after calling $addthisProvider.disableAutoAdd()', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                $addthisProvider.disableAutoAdd();
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should not auto add addthis_widget.js', function() {
            var matches = findAddThisScriptOnPage();
            expect(matches.length).toBe(0);
        });
    });
});