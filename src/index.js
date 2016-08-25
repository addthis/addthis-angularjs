var addthisModule = function(window, angular) {
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

    /*
     * All these params must also show up in the same order when adding the
     * directive to the Angular app
     */
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
        var baseUrl = 'https://s7.addthis.com/js/300/addthis_widget.js';

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

    var addthisService = function ($window, $q, $interval) {

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

        var smartLayersRefresh = function(toolClass) {
            onLoad().then(function() {
                // put smarts around this.
                // wait and see if more requests come in before running
                $window.addthis.layers({'share': {}});

                if (typeof $window.addthis !== 'undefined' &&
                    typeof $window.addthis.layers !== 'undefined' &&
                    typeof $window.addthis.layers.refresh !== 'undefined'
                ) {
                    $window.addthis_config = angular.copy(addthis_config);
                    $window.addthis_share = angular.copy(addthis_share);
                    $window.addthis.layers.refresh(addthis_share.url, addthis_share.title);
                }
            });

        };

        var service = {
            addScript: addScript,
            smartLayersRefresh: smartLayersRefresh,
            addthis_config: setAddThisConfig,
            addthis_share: setAddThisShare,
            shareUrl: setShareUrl,
            shareTitle: setShareTitle,
            onLoad: onLoad
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
                scriptInFooter = false;
            } else {
                scriptInFooter = true;
            }
            return this;
        };

        this.$get = addthisService;

        return this;
    };

    var addthisRun = function($addthis, $window) {
        $window.addthis_plugin_info = addthis_plugin_info;
        $window.addthis_config = angular.copy(addthis_config);
        $window.addthis_share = angular.copy(addthis_share);

        if (autoAddScript) {
            addScript($window.document);
        }
    };

    var addthisModule = angular.module('official.addthis', ['ng']);
    addthisModule.provider('$addthis', ['$windowProvider', addthisProvider]);
    addthisModule.run(['$addthis', '$window', addthisRun]);
    /*
     * Except for the last param, all these items must also show up in the same
     * order the params in addthisDirective
     */
    addthisModule.directive('addthisTool', [
        '$addthis',
        '$timeout',
        '$window',
        addthisDirective
    ]);
    return addthisModule;
}(window, angular);