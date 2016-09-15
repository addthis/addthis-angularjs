/* globals describe, inject, beforeEach, afterEach, expect, it, spyOn */
'use strict';

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

describe('addthis_config', function() {
    var $addthis;

    var profileId = 'ra-57b71bceb3ebb9df';

    var testConfigs = {
        'foo': 'bar'
    };

    describe('set via $addthisProvider.config & profileID not set', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id(false);
                expect(newProfileId).toBe(false);
                var configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({});
                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                configCopy = $addthisProvider.config(testConfigs);
                expect(configCopy).toEqual(testConfigs);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should match what was set', function() {
            expect(window.addthis_config).toEqual(testConfigs);
        });
    });

    describe('set via $addthisProvider.config & profileId set', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id(profileId);
                expect(newProfileId).toBe(profileId);
                var configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({'pubid': profileId});
                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                configCopy = $addthisProvider.config(testConfigs);
                expect(configCopy.foo).toBe(testConfigs.foo);
                expect(configCopy.pubid).toBe(profileId);

            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should match what was set but also add in pubid', function() {
            expect(window.addthis_config.foo).toBe(testConfigs.foo);
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });

    describe('set via $addthisProvider.config & profileId, override profile id', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id('foo');
                expect(newProfileId).toBe('foo');

                var configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({'pubid': 'foo'});


                newProfileId = $addthisProvider.profile_id(profileId);
                expect(newProfileId).toBe(profileId);

                configCopy = $addthisProvider.config({});
                expect(configCopy).toEqual({'pubid': profileId});

                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});

                configCopy = $addthisProvider.config(testConfigs);
                expect(configCopy.foo).toBe(testConfigs.foo);
                expect(configCopy.pubid).toBe(profileId);
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should be able to override the pubid', function() {
            expect(window.addthis_config.foo).toBe(testConfigs.foo);
            expect(window.addthis_config.pubid).toBe(profileId);
        });
    });

    describe('set via $addthis.config with ignore_server_config true', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id(false);
                expect(newProfileId).toBe(false);
                var configCopy = $addthisProvider.config({ignore_server_config: true});
                expect(configCopy).toEqual({ignore_server_config: true});
                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set window.addthis_config.ignore_server_config to true', function() {
            expect(window.addthis_config.ignore_server_config).toBe(true);
        });

        it('should set window.addthis_plugin_info.plugin_mode to Local', function() {
            expect(window.addthis_plugin_info.plugin_mode).toBe('Local');
        });
    });

    describe('set via $addthis.config with ignore_server_config false', function() {
        beforeEach(function() {
            module(function($addthisProvider) {
                var newProfileId = $addthisProvider.profile_id(false);
                expect(newProfileId).toBe(false);
                var configCopy = $addthisProvider.config({ignore_server_config: false});
                expect(configCopy).toEqual({ignore_server_config: false});
                var shareCopy = $addthisProvider.share({});
                expect(shareCopy).toEqual({});
            });
        });

        beforeEach(inject(function($injector) {
            $addthis = $injector.get('$addthis');
        }));

        it('should set window.addthis_config.ignore_server_config to false', function() {
            expect(window.addthis_config.ignore_server_config).toBe(false);
        });

        it('should set window.addthis_plugin_info.plugin_mode to AddThis', function() {
            expect(window.addthis_plugin_info.plugin_mode).toBe('AddThis');
        });
    });
});
