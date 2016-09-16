/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */

'use strict';

beforeEach(function() {
    delete window.addthis_share;
    delete window.addthis_config;
    delete window.addthis_plugin_info;
    delete window.addthis;

    module('addthis');
});

describe('with no explicit configuration', function() {
    var $addthis;
    var $document;
    var $window;
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

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    it('should define addthis_share as an empty object', function() {
        expect(window.addthis_share).toEqual({});
    });

    it('should define addthis_config as an empty object', function() {
        expect(window.addthis_config).toEqual({});
    });

    it('should define addthis_plugin_info', function() {
        expect(window.addthis_plugin_info).toBeDefined();
    });

    it('should add addthis_widget.js into the footer', function() {
        var matches = findAddThisScriptOnPage();
        expect(matches.length).toBe(1);
        expect(matches[0].src).toBe(addthisWidgetUrl);
    });
});