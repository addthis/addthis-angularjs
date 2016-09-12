'use strict';

describe('appExample2 configuration', function() {
    var $addthis;

    beforeEach(function() {
        module('appExample2');
    });

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
    }));

    describe('$addthis service', function () {
        it('should run successfully', function () {
            expect($addthis).toBeDefined();
        });
    });

    describe('addthis_config', function () {
        it('should be an object', function () {
            expect(typeof window.addthis_config).toBe('object');
        });

        it('should have a profile id', function () {
            expect(window.addthis_config.pubid).toBe('ra-57b71bceb3ebb9df');
        });

        it('should have nothing but profile id', function () {
            expect(window.addthis_config).toEqual({
                'pubid': 'ra-57b71bceb3ebb9df'
            });
        });
    });

    describe('addthis_share', function () {
        it('should be an empty object', function () {
            expect(window.addthis_share).toEqual({});
        });
    });

    describe('addthis_plugin_info', function () {
        it('should be an object', function () {
            expect(typeof window.addthis_plugin_info).toBe('object');
        });

        it('should have default values', function () {
            expect(window.addthis_plugin_info.info_status).toBe('enabled');
            expect(window.addthis_plugin_info.cms_name).toBe('Angular');
            expect(window.addthis_plugin_info.plugin_name).toBe('official-addthis-angular');
            expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
            expect(typeof window.addthis_plugin_info.plugin_version).toBe('string');
        });

        it('should include the AngularJS version', function () {
            expect(window.addthis_plugin_info.cms_version).toBe(angular.version.full);
        });
    });
});