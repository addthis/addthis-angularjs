/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

describe('script placement configurations', function() {
   'use strict';

    var $addthis;
    var addthisWidgetUrl = 'https://s7.addthis.com/js/300/addthis_widget.js';

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

    var validateAddThisProvider = function($addthisProvider) {
        expect($addthisProvider).toBeDefined();
        expect($addthisProvider.profile_id).toBeDefined();
        expect($addthisProvider.config).toBeDefined();
        expect($addthisProvider.share).toBeDefined();
        expect($addthisProvider.share_url).toBeDefined();
        expect($addthisProvider.share_title).toBeDefined();
        expect($addthisProvider.disable_auto_add).toBeDefined();
        expect($addthisProvider.enable_auto_add).toBeDefined();
        expect($addthisProvider.script_in_head).toBeDefined();
        expect($addthisProvider.$get).toBeDefined();
    };

    beforeEach(function() {
        module(function($addthisProvider) {
            validateAddThisProvider($addthisProvider);
            removeAddThisScriptFromPage();
            var result = $addthisProvider.script_in_head();
            validateAddThisProvider(result);
            //window.addthis_config.pubid = 'foo';
            var newProfileId = $addthisProvider.profile_id('foo');
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

        expect(headerMatches[0].src).toBe(url);
    });

    it('should only add addthis_widget onto the page once', function() {
        $addthis.add();
        $addthis.add();
        var headerMatches = findAddThisScriptOnPage(true);
        expect(headerMatches.length).toBe(1);
    });

});

describe('cleanup:', function() {
    var $addthis;
    beforeEach(function() {
        module(function($addthisProvider) {
            var newProfileId = $addthisProvider.profile_id(false);
            var newConfigs = $addthisProvider.config({});
            expect(newProfileId).toBe(false);
        });
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('reset profile id in $addthisProvider', function() {
        expect(1).toBe(1);
    });
});