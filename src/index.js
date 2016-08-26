var addthisModule = (function(window, angular) {
    var autoAddScript = true;
    var scriptInFooter = true;
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

    if (angular.version && angular.version.full) {
        addthis_plugin_info.cms_version = angular.version.full;
    }

    var checkForScript = function(document) {
        var scriptOnPage = false;
        var selector = 'script[src$="addthis_widget.js"]';
        var matches = document.querySelectorAll(selector);
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
        var baseUrl = 'https://s7.addthis.com/js/300/addthis_widget.js';
        //var baseUrl = 'http://www-local.addthis.com/js/300/addthis_widget.js';

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

        if(!scriptInFooter && document.head) {
            document.head.appendChild(script);
        } else {
            document.body.appendChild(script);
        }

        // todo do we also want to add namespaces onto the html tag for XHTML?
    };

    var setAddThisConfig = function(input) {
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

    var setAddThisShare = function(input) {
        if (typeof input === 'object') {
            addthis_share = angular.copy(input);
        }

        return angular.copy(addthis_share);
    };

    var setShareUrl = function(url) {
        addthis_share.url = url;
    };

    var setShareTitle = function(title) {
        addthis_share.title = title;
    };

    var smartLayersRefreshRequest = {
        pending: false
    };

    var queueSmartLayersRefresh = function($window, $interval) {
        smartLayersRefreshRequest.lastTs = (new Date()).getTime();

        if (smartLayersRefreshRequest.pending ||
            typeof $window.addthis === 'undefined' ||
            typeof $window.addthis.layers === 'undefined' ||
            typeof $window.addthis.layers.refresh === 'undefined'
        ) {
            return;
        }

        smartLayersRefreshRequest.pending = true;

        var intervalPromise = $interval(
            function() {
                var now = (new Date()).getTime();

                // if it's been at least 99ms since the last request
                // and it's been more than 500ms since client did a layers
                // refresh (client won't do it more often anyway)
                if (now - smartLayersRefreshRequest.lastTs > 99 &&
                    now - $window.addthis.layers.lastViewRegistered > 500
                ) {
                    //$window.addthis.layers({'share': {}});

                    $interval.cancel(intervalPromise);
                    smartLayersRefreshRequest.pending = false;
                    //refresh layers
                    $window.addthis.layers.refresh(
                        addthis_share.url,
                        addthis_share.title
                    );
                }
            },
            100,
            0,
            false
        );
    };

    var addthisService = function($window, $q, $interval) {
        var load = {
            promise: false,
            interval: 200
        };
        var onLoad = function() {
            if(load.promise) {
                return load.promise;
            }
            var deferred = $q.defer();

            if($window.addthis) {
                deferred.resolve($window.addthis);
            } else {
                var addThisCheckPromise = $interval(
                    function() {
                        if($window.addthis) {
                            $interval.cancel(addThisCheckPromise);
                            load.done = true;
                            deferred.resolve($window.addthis);
                        }
                    },
                    load.interval,
                    0,
                    false
                );
            }

            load.promise = deferred.promise;
            return load.promise;
        };

        var service = {
            addScript: addScript,
            smartLayersRefresh: function() {
                $window.addthis_config = angular.copy(addthis_config);
                $window.addthis_share = angular.copy(addthis_share);
                queueSmartLayersRefresh($window, $interval);
            },
            addthis_config: setAddThisConfig,
            addthis_share: setAddThisShare,
            shareUrl: setShareUrl,
            shareTitle: setShareTitle,
            onLoad: onLoad
        };

        return service;
    };

    var addthisProvider = function($windowProvider) {
        var window = $windowProvider.$get();

        if (window.addthis_config) {
            addthis_config = angular.copy(window.addthis_config);
        }

        if (window.addthis_share) {
            addthis_share = angular.copy(window.addthis_share);

            if (window.addthis) {
                /* If client has already set up the global addthis variable
                 * by now, then the url and title properties may have been set
                 * by it and not on page. Let's not hold on to it.
                 */
                if (addthis_share.url) {
                    delete addthis_share.url;
                }

                if (addthis_share.title) {
                    delete addthis_share.title;
                }
            }
        }

        this.profileId = function(inputProfileId) {
            profileId = inputProfileId;
            addthis_config.pubid = inputProfileId;
            return this;
        };

        this.addthis_config = function(addthis_config) {
            setAddThisConfig(addthis_config);
            return this;
        };

        this.addthis_share = function(addthis_share) {
            setAddThisShare(addthis_config);
            return this;
        };

        this.setShareUrl = function(url) {
            setShareUrl(url);
            return this;
        };

        this.setShareTitle = function(title) {
            setShareTitle(title);
            return this;
        };

        this.autoAddScript = function(add) {
            autoAddScript = !!add;
            return this;
        };

        this.setScriptPlacement = function(placement) {
            if (placement === 'header') {
                scriptInFooter = false;
            } else {
                scriptInFooter = true;
            }
            return this;
        };

        this.$get = addthisService;

        return this;
    };

    /*
     * All these params must also show up in the same order when adding the
     * run to the Angular app
     */
    var addthisRun = function($window, $rootScope, $location, $interval) {
        $window.addthis_plugin_info = addthis_plugin_info;
        $window.addthis_config = angular.copy(addthis_config);
        $window.addthis_share = angular.copy(addthis_share);

        if (autoAddScript) {
            addScript($window.document);
        }

        $rootScope.$on(
            '$locationChangeSuccess',
            function(event, next, current) {
                if (next !== current) {
                    queueSmartLayersRefresh($window, $interval);
                }
            }
        );
    };

    /*
     * All these params must also show up in the same order when adding the
     * directive to the Angular app
     */
    var addthisDirective = function($addthis, $timeout) {
        return {
            scope: {
                toolClass: '=toolClass',
                shareUrl: '=shareUrl',
                shareTitle: '=shareTitle'
            },
            link: function($scope, el) {
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
                    //$compile(toolDiv)($scope);

                    $timeout(function() {
                        $addthis.smartLayersRefresh();
                    });
                };

                $scope.$watchGroup(
                    ['toolClass', 'shareUrl', 'shareTitle'],
                    function(newVal, oldVal) {
                        if (newVal[0] !== oldVal[0] ||
                            newVal[1] !== oldVal[1] ||
                            newVal[2] !== oldVal[2]
                        ) {
                            recreateToolDiv();
                        }
                    }
                );
            }
        };
    };

    var addthisModule = angular.module('official.addthis', ['ng']);
    /*
     * Except for the last array item, all these items must in the array must
     * show up in the same order the params in addthisProvider
     */
    addthisModule.provider('$addthis', ['$windowProvider', addthisProvider]);
    /*
     * Except for the last array item, all these items must also show up in the
     * same order the params in addthisRun
     */
    addthisModule.run([
        '$window',
        '$rootScope',
        '$location',
        '$interval',
        addthisRun
    ]);
    /*
     * Except for the last array item, all these items must in the array must
     * show up in the same order the params in addthisDirective
     */
    addthisModule.directive('addthisTool', [
        '$addthis',
        '$timeout',
        '$window',
        addthisDirective
    ]);
    return addthisModule;
}(window, angular));