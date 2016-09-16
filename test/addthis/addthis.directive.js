/* globals describe, inject, beforeEach, expect, it, spyOn */

'use strict';


describe('addthis directive', function() {
    var $addthis;
    var $rootScope;
    var $compile;
    var $timeout;
    var element;
    var scope;
    var toolClass1 = 'addthis_sharing_toolbox';
    var toolClass2 = 'addthis_native_toolbox';
    var title1 = 'hello world';
    var title2 = 'foo';
    var url1 = 'https://www.addthis.com';
    var url2 = 'bar';
    var directiveIsolatedScope;

    var applyChangesToScope = function() {
        scope.$digest();
        $timeout.flush();
    };

    var setupDirective = function() {
        element = $compile(element)(scope);
        applyChangesToScope();
        directiveIsolatedScope = element.isolateScope();
    };

    beforeEach(inject(function($injector) {
        $addthis = $injector.get('$addthis');
        $rootScope = $injector.get('$rootScope');
        $compile = $injector.get('$compile');
        $timeout = $injector.get('$timeout');
        scope = $rootScope.$new();
        spyOn($addthis, 'layers_refresh').and.callThrough();
    }));

    beforeEach(function(done) {
        done();
    });

    describe('hard coded values', function() {
        describe('with tool class and without share url and title', function() {
            beforeEach(function() {
                element ='<div addthis-tool tool-class="\''+toolClass1+'\'">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });
        });

        describe('with tool class, share url and without share title', function() {
            beforeEach(function() {
                element ='<div addthis-tool tool-class="\''+toolClass1+'\'" share-url="\''+url1+'\'">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBe(url1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });
        });

        describe('with tool class, share title and without share url', function() {
            beforeEach(function() {
                element ='<div addthis-tool tool-class="\''+toolClass1+'\'" share-title="\''+title1+'\'">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBe(title1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });
        });

        describe('with tool class, share title and without share url', function() {
            beforeEach(function() {
                element ='<div addthis-tool tool-class="\''+toolClass1+'\'" share-url="\''+url1+'\'" share-title="\''+title1+'\'">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBe(url1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBe(title1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });
        });
    });

    describe('using variables in the parent scope', function() {
        describe('with tool class and without share url and title', function() {
            beforeEach(function() {
                scope.toolClass = toolClass1;
                element ='<div addthis-tool tool-class="toolClass">';
                setupDirective();
            });

            it('should have the initially defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should change tool class when the relavant scope variable changes', function() {
                scope.toolClass = toolClass2;
                applyChangesToScope();
                expect(directiveIsolatedScope.toolClass).toBe(toolClass2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });
        });

        describe('with tool class, share url and without share title', function() {
            beforeEach(function() {
                scope.toolClass = toolClass1;
                scope.shareUrl = url1;
                element ='<div addthis-tool tool-class="toolClass" share-url="shareUrl">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBe(url1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should change tool class when the relavant scope variable changes', function() {
                scope.toolClass = toolClass2;
                applyChangesToScope();
                expect(directiveIsolatedScope.toolClass).toBe(toolClass2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });

            it('should change share url when the relavant scope variable changes', function() {
                scope.shareUrl = url2;
                applyChangesToScope();
                expect(directiveIsolatedScope.shareUrl).toBe(url2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });
        });

        describe('with tool class, share title and without share url', function() {
            beforeEach(function() {
                scope.toolClass = toolClass1;
                scope.shareTitle = title1;
                element ='<div addthis-tool tool-class="toolClass" share-title="shareTitle">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBeUndefined();
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBe(title1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should change tool class when the relavant scope variable changes', function() {
                scope.toolClass = toolClass2;
                applyChangesToScope();
                expect(directiveIsolatedScope.toolClass).toBe(toolClass2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });

            it('should change share title when the relavant scope variable changes', function() {
                scope.shareTitle = title2;
                applyChangesToScope();
                expect(directiveIsolatedScope.shareTitle).toBe(title2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });
        });

        describe('with tool class, share title and without share url', function() {
            beforeEach(function() {
                scope.toolClass = toolClass1;
                scope.shareUrl = url1;
                scope.shareTitle = title1;
                element ='<div addthis-tool tool-class="toolClass" share-url="shareUrl" share-title="shareTitle">';
                setupDirective();
            });

            it('should have a defined tool class', function() {
                expect(directiveIsolatedScope.toolClass).toBe(toolClass1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share url', function() {
                expect(directiveIsolatedScope.shareUrl).toBe(url1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should have an undefined share title', function() {
                expect(directiveIsolatedScope.shareTitle).toBe(title1);
                expect($addthis.layers_refresh.calls.count()).toBe(1);
            });

            it('should change tool class when the relavant scope variable changes', function() {
                scope.toolClass = toolClass2;
                applyChangesToScope();
                expect(directiveIsolatedScope.toolClass).toBe(toolClass2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });

            it('should change share url when the relavant scope variable changes', function() {
                scope.shareUrl = url2;
                applyChangesToScope();
                expect(directiveIsolatedScope.shareUrl).toBe(url2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });

            it('should change share title when the relavant scope variable changes', function() {
                scope.shareTitle = title2;
                applyChangesToScope();
                expect(directiveIsolatedScope.shareTitle).toBe(title2);
                expect($addthis.layers_refresh.calls.count()).toBe(2);
            });
        });
    });
});