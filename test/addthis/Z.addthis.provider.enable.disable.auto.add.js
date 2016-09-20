/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('$addthis provider auto add', function() {
    var $addthis;

    var findAddThisScriptOnPage = function(header) {
        //var foo;
        var addthisWidgetSelector;
        if (header === true) {
            //foo = document.head;
            addthisWidgetSelector = 'script[src*="addthis_widget.js"]';
        } else {
            //foo = document;
            addthisWidgetSelector = 'body script[src*="addthis_widget.js"]';
        }

        var matches = document.querySelectorAll(addthisWidgetSelector);
        return matches;
    };

    var removeAddThisScriptFromPage = function() {
        var matches = findAddThisScriptOnPage(true);

        angular.forEach(matches, function(node) {
            node.parentNode.removeChild(node);
        });

        var headerMatches = findAddThisScriptOnPage(true);
        expect(headerMatches.length).toBe(0);
    };

    describe('$addthisProvider enable_auto_add()', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                removeAddThisScriptFromPage();
                var matches = findAddThisScriptOnPage();
                expect(matches.length).toBe(0);
                $addthisProvider.enable_auto_add();
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should auto addaddthis_widget.js', function() {
            var matches = findAddThisScriptOnPage();
            expect(matches.length).toBe(1);
        });
    });

    describe('$addthisProvider disable_auto_add()', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                removeAddThisScriptFromPage();
                var matches = findAddThisScriptOnPage();
                expect(matches.length).toBe(0);
                $addthisProvider.disable_auto_add();
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