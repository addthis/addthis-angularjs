/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

describe('script placement configurations', function() {
    var $addthis;
    var addthisWidgetUrl = 'addthis_widget.js';

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

    beforeEach(function() {
        module(function($addthisProvider) {
            // cleanup after last tests
            var newProfileId, configCopy, shareCopy;
            newProfileId = $addthisProvider.profile_id(false);
            expect(newProfileId).toBe(false);
            configCopy = $addthisProvider.config({});
            expect(configCopy).toEqual({});
            shareCopy = $addthisProvider.share({});
            expect(shareCopy).toEqual({});

            removeAddThisScriptFromPage();
            $addthisProvider.script_in_head();
            newProfileId = $addthisProvider.profile_id('foo');
            expect(newProfileId).toBe('foo');
        });
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('$addthisProvider.script_in_head() should add addthis_widget.js into the header', function() {
        $addthis.add();
        var headerMatches = findAddThisScriptOnPage(true);
        expect(headerMatches.length).toBe(1);

        var url;
        if(window.addthis_config.pubid) {
            url = addthisWidgetUrl + '#pubid=' + window.addthis_config.pubid;
        } else {
            url = addthisWidgetUrl;
        }

        var compareUrl = headerMatches[0].src.substring(headerMatches[0].src.length - url.length, headerMatches[0].src.length);

        expect(compareUrl).toBe(url);
    });

    it('should only add addthis_widget onto the page once', function() {
        $addthis.add();
        $addthis.add();
        var headerMatches = findAddThisScriptOnPage(true);
        expect(headerMatches.length).toBe(1);
    });
});