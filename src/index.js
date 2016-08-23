var addthisModule = function(window, angular) {
    var autoAddScript = true;
    var scriptPlacement = 'footer';
    var profileId;
    var addthis_config = {};
    var addthis_share = {};

    var addthis_plugin_info = {
        info_status    : 'enabled',
        cms_name       : 'Angular',
        plugin_name    : 'official-addthis-angular',
        plugin_version : '0.0.1',
        plugin_mode    : 'AddThis'
    };

    var addthisDirective = function(
        $addthis,
        $timeout,
        $window
    ) {
        return {
            scope: {
                toolClass: '=toolClass',
                shareUrl: '=shareUrl',
                shareTitle: '=shareTitle'
            },
            link: function($scope, el, attrs) {
                var toolDiv;
                var urlAttr = 'data-url';
                var titleAttr = 'data-title';

                var recreateToolDiv = function() {
                    var newToolDiv = document.createElement('div');
                    newToolDiv.className = $scope.toolClass;

                    if (angular.isDefined($scope.shareUrl)) {
                        newToolDiv.setAttribute(urlAttr, $scope.shareUrl);
                    }
                    if (angular.isDefined($scope.shareTitle)) {
                        newToolDiv.setAttribute(titleAttr, $scope.shareTitle);
                    }

                    el.empty();
                    el.append(newToolDiv);
                    toolDiv = newToolDiv;

                    $timeout(function() {
                        $addthis.smartLayersRefresh($scope.toolClass);
                    });
                };

                $scope.$watchGroup(['toolClass', 'shareUrl', 'shareTitle'], function(newVal, oldVal) {
                    recreateToolDiv();
                });
            }
        };
    };

    var checkForScript = function(document) {
        var scriptOnPage = false;
        var matches = document.querySelectorAll('script[src$="addthis_widget.js"]');
        if(matches.length > 0) {
            scriptOnPage = true;
        }
        return scriptOnPage;
    };

    var addScript = function(document) {
        if (checkForScript(document)) {
            return;
        }

        var url;
        var baseUrl = 'http://s7.addthis.com/js/300/addthis_widget.js';

        //todo allow use of dev, test and local client
        //if(enviroment) {
          // build url for local, dev or test
        //}

        if(profileId) {
            url = baseUrl + '#pubid=' + profileId;
        } else {
            url = baseUrl;
        }

        var script = document.createElement('script');
        script.src = url;

        if(scriptPlacement === 'header' && document.head) {
            document.head.appendChild(script);
        } else {
            document.body.appendChild(script);
        }

        // todo do we also want to add namespaces onto the html tag for XHTML?
    };

    var addthisService = function ($window) {
        var smartLayersRefresh = function(toolClass) {
            // put smarts around this.
            // run after addthis has loaded
            // wait and see if more requests come in before running
            if (typeof $window.addthis !== 'undefined') {
                $window.addthis.layers.refresh();
            }
        };

        var service = {
            addScript: addScript,
            smartLayersRefresh: smartLayersRefresh,
            addthis_config: setAddThisConfig,
            addthis_share: setAddThisShare,
            shareUrl: setShareUrl,
            shareTitle: setShareTitle
        };
        return service;
    };

    if (angular && angular.version && angular.version.full) {
        addthis_plugin_info.cms_version = angular.version.full;
    }

    var setAddThisConfig = function (input) {
        if (typeof input === 'object') {
            addthis_config = angular.copy(input);

            if (addthis_config.pubid) {
                profileId = addthis_config.pubid;
            } else if (profileId) {
                addthis_config.pubid = profileId;
            }

            if (addthis_config.ignore_server_config) {
                addthis_plugin_info.plugin_mode = 'Local';
            } else {
                addthis_plugin_info.plugin_mode = 'AddThis';
            }
        }

        return angular.copy(addthis_config);
    };

    var setAddThisShare = function (input) {
        if (typeof input === 'object') {
            addthis_share = angular.copy(input);
        }

        return angular.copy(addthis_share);
    };

    var setShareUrl = function (url) {
        addthis_share.url = url;
    };

    var setShareTitle = function (title) {
        addthis_share.title = title;
    };

    var addthisProvider = function($windowProvider) {
        var window = $windowProvider.$get();

        if (window.addthis_config) {
            addthis_config = window.addthis_config;
        }

        if (window.addthis_share) {
            addthis_share = window.addthis_share;
        }

        this.profileId = function (inputProfileId) {
            profileId = inputProfileId;
            addthis_config.pubid = inputProfileId;
            return this;
        };

        this.addthis_config = function (addthis_config) {
            setAddThisConfig(addthis_config);
            return this;
        };

        this.addthis_share = function (addthis_share) {
            setAddThisShare(addthis_config);
            return this;
        };

        this.setShareUrl = function (url) {
            setShareUrl(url);
            return this;
        };

        this.setShareTitle = function (title) {
            setShareTitle(title);
            return this;
        };

        this.autoAddScript = function(add) {
            autoAddScript = !!add;
            return this;
        };

        this.setScriptPlacement = function(placement) {
            if (placement === 'header') {
                scriptPlacement = 'header';
            } else {
                scriptPlacement = 'footer';
            }
            return this;
        };

        this.$get = addthisService;

        return this;
    };

    var addthisRun = function($addthis, $window) {
        $window.addthis_plugin_info = addthis_plugin_info;
        $window.addthis_config = addthis_config;
        $window.addthis_share = addthis_share;

        if (autoAddScript) {
            addScript($window.document);
        }
    };

    var addthisModule = angular.module('official.addthis', ['ng']);
    addthisModule.provider('$addthis', addthisProvider);
    addthisModule.run(['$addthis', '$window', addthisRun]);
    addthisModule.directive('addthisTool', addthisDirective);
    return addthisModule;
}(window, angular);