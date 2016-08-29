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

    /*
     * @description
     * Checks if AddThis' `addthis_widget.js` script is on page
     *
     * @private
     * @param {object} document The Document interface represents any web page
     * loaded in the browser and serves as an entry point into the web page's
     * content.
     * @returns {boolean} true if the script is on the page, false if it is not
     **/
    var checkForScript = function(document) {
        var scriptOnPage = false;
        var selector = 'script[src$="addthis_widget.js"]';
        var matches = document.querySelectorAll(selector);
        if(matches.length > 0) {
            scriptOnPage = true;
        }
        return scriptOnPage;
    };

    /*
     * @description
     * Adds AddThis's `addthis_widget.js` script onto the page if it's not
     * already present
     *
     * @private
     * @param {object} document The Document interface represents any web page
     * loaded in the browser and serves as an entry point into the web page's
     * content.
     **/
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

    var smartLayersRefreshRequest = {
        pending: false
    };

    /*
     * @description
     * Checks if `addthis_widget.js` is loaded yet and whether SmartLayers has
     * initialized. If not, there's no need to bother with
     * `addthis.layers.refresh`. If present, creates an interval promise for
     * 100ms to make sure more refresh requests aren't coming still coming in
     * from the app very soon. If no more refresh requests have come in, and
     * refresh hasn't been called in 500ms, `addthis.layers.refresh` is
     * executed. FYI: AddThis SmartLayers API will ignore calls to
     * `addthis.layers.refresh` if it's been called already within 500ms.
     *
     * @private
     * @param {object} $window The window object represents a window containing a
     *   DOM document
     * @param {object} $interval Angular's wrapper for `window.setInterval`
     **/
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
                if (now - smartLayersRefreshRequest.lastTs >= 100 &&
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

    /*
     * @description
     * Sets the `addthis_config` variable on the page. If the pubid is set it
     * take it an use it elsewhere. Otherwise, it will add in the previously set
     * profile ID (if set) to `addthis_config.pubid`. See
     * <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
     * the addthis_config variable documentation</a> for options.
     *
     * @private
     * @param {object} input AddThis configuration object. See
     *   <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
     *   the addthis_config variable documentation</a> for options.
     * @returns {object} a copy of the `addthis_config` variable on the
     *   page with an added pubid property if it wasn't set in the input
     *   and a profile ID was set elsewhere
     **/
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

    /*
     * @description
     * Sets the `addthis_share` variable on the page. See
     * https://www.addthis.com/academy/the-addthis_share-variable/ for options.
     *
     * @private
     * @param {object} input AddThis sharing options. See
     *   https://www.addthis.com/academy/the-addthis_share-variable/ for
     *   options.
     * @returns {object} a copy of the `addthis_share` variable on the page
     **/
    var setAddThisShare = function(input) {
        if (typeof input === 'object') {
            addthis_share = angular.copy(input);
        }

        return angular.copy(addthis_share);
    };

    /*
     * @description
     * Sets the URL shared by tools that don't explicitly set one through the
     * `data-url` attribute. This is a shortcut to adding the URL into
     * `addthis_share.url`. See
     * https://www.addthis.com/academy/the-addthis_share-variable/ for
     * more information on `addthis_share`. If not set here or in the `data-url`
     * attribute, the browsers URL will be used when sharing.
     *
     * @private
     * @param {string} url The URL to share when a user clicks on a share
     *   buttons that don't otherwise speicfy a share URL
     **/
    var setShareUrl = function(url) {
        addthis_share.url = url;
    };


    /*
     * @description
     * Sets the title shared by tools that don't explicitly set one through the
     * `data-title` attribute. This is a shortcut to adding the title into
     * `addthis_share.title`. See
     * https://www.addthis.com/academy/the-addthis_share-variable/ for
     * more information on `addthis_share`. If not set here or in the
     * `data-title` attribute, the document title will be used when sharing.
     *
     * @private
     * @param {string} title The title to share when a user clicks on a share
     *   buttons that don't otherwise speicfy a share title
     **/
    var setShareTitle = function(title) {
        addthis_share.title = title;
    };

    var load = {
        promise: false,
        interval: 200
    };

    /*
     * @description
     * Returns a promise that resolves once AddThis' `addthis_widget.js`
     * loaded and is ready to use.
     *
     * @private
     * @param {object} $window The window object represents a window containing a
     *   DOM document;
     * @param {object} $q Angular's promise implementation
     * @param {object} $interval Angular's wrapper for `window.setInterval`
      **/
    var scriptLoaded = function($window, $q, $interval) {
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

    /**
     * @ngdoc service
     * @name addthis.$addthis
     *
     * @description
     * A service for handling AddThis actions once your app is running.
     **/
    var addthisService = function($window, $q, $interval) {
        var service = {
            /**
             * @ngdoc method
             * @name addthis.$addthis#add
             * @methodOf addthis.$addthis
             *
             * @description
             * Adds the `addthis_widget.js` script onto the page if not
             * already present. Note: `addthis_widget.js` will automatically be
             * added to your page unless turned off using
             * `$addthisProvider.disable_auto_add`.
             *
             * @example
             * ```js
             * app.controller('AcceptCookiesCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     $scope.userAccepts = function() {
             *         $service.add();
             *     };
             * }]);
             * ```
             **/
            add: function() {
                addScript($window.document);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#layers_refresh
             * @methodOf addthis.$addthis
             *
             * @description
             * Applys new values from `addthis_config` and `addthis_share`,
             * updates the share url and title where not explicitly set and
             * reloads AddThis floating tools.
             *
             * This module will catch most of the situations where AddThis'
             * SmartLayers API needs to be refreshed. However, there may be
             * some times siutations where the devleoper must call this
             * directly, such as:
             *  <ul>
             *   <li>changing the document title without a location/route/state changes (where the share title on floating should reflect thge document title)</li>
             *   <li>adding inline tools onto pages without using the addthisTool directive</li>
             * </ul>
             *
             * @example
             * ```js
             * app.controller('AccountPageCtrl', ['$scope', '$addthis', '$window', function($scope, $addthis, $window) {
             *     $window.document.title = 'Account Page';
             *     $addthis.layers_refresh();
             * }]);
             * ```
             **/
            layers_refresh: function() {
                $window.addthis_config = angular.copy(addthis_config);
                $window.addthis_share = angular.copy(addthis_share);
                queueSmartLayersRefresh($window, $interval);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#config
             * @methodOf addthis.$addthis
             *
             * @description
             * Sets the `addthis_config` variable on the page. If the pubid is set it
             * take it an use it elsewhere. Otherwise, it will add in the previously set
             * profile ID (if set) to `addthis_config.pubid`. See
             * <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
             * the addthis_config variable documentation</a> for options.
             *
             * @example
             * ```js
             * app.controller('DoNotPrintOrEmailMeCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     var cfg = {
             *         'services_exclude': 'print,mailto',
             *         'ui_language': 'pl',
             *         'data_track_clickback': false,
             *         'ui_508_compliant': true
             *     };
             *     $addthis.config(cfg);
             * }]);
             * ```
             *
             * @param {object} input AddThis configuration object. See
             *   <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
             *   the addthis_config variable documentation</a> for options.
             * @returns {object} a copy of the `addthis_config` variable on the
             *   page with an added pubid property if it wasn't set in the input
             *   and a profile ID was set elsewhere
             **/
            config: function(input) {
                setAddThisConfig();
                queueSmartLayersRefresh($window, $interval);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#share
             * @methodOf addthis.$addthis
             *
             * @description
             * Sets the `addthis_share` variable on the page. See
             * <a href="https://www.addthis.com/academy/the-addthis_share-variable/" target="_blank">
             * the addthis_share variable documentation</a> for options.
             *
             * @example
             * ```js
             * app.controller('AddThisInfoCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     var share_info = {
             *         'url': 'https://www.addthis.com',
             *         'link': 'AddThis tools rock!',
             *         'passthrough': {
             *             'twitter': {
             *                 'via': 'TWITTER USERNAME'
             *             }
             *         }
             *     };
             *     $addthis.share(share_info);
             * }]);
             * ```
             *
             * @param {object} input AddThis configuration object. See
             *   <a href="https://www.addthis.com/academy/the-addthis_share-variable/" target="_blank">
             *   the addthis_share variable documentation</a> for options.
             * @returns {object} a copy of the `addthis_share` variable on the
             *   page with an added pubid property if it wasn't set in the input
             *   and a profile ID was set elsewhere
             **/
            share: function(input) {
                setAddThisShare(input);
                queueSmartLayersRefresh($window, $interval);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#share_url
             * @methodOf addthis.$addthis
             *
             * @description
             * This is a shortcut to setting the URL through
             * `$addthis.share({'url': 'http://example.com'})`. Sets the URL
             * shared by tools that don't explicitly set one. With the
             * `addthisTool` directive, you may set the URL explicitly using
             * the `share-url` attribute. If not set otherwise, the browsers URL
             * will be used when sharing.
             *
             * @example
             * ```js
             * app.controller('AddThisInfoCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     $addthis.share_url('https://www.addthis.com');
             * }]);
             * ```
             *
             * @param {string} url The URL to share when a user clicks on share
             *   buttons that don't otherwise speicfy a share URL
             **/
            share_url: function(url) {
                setShareUrl();
                queueSmartLayersRefresh($window, $interval);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#share_title
             * @methodOf addthis.$addthis
             *
             * @description
             * This is a shortcut to setting the title through
             * `$addthis.share({'title': 'Check this out!'})`. Sets the title
             * shared by tools that don't explicitly set one. With the
             * `addthisTool` directive, you may set the URL explicitly using
             * the `share-title` attribute. If not set otherwise, the
             * document's title will be used when sharing.
             *
             * Note: Some services (such as Facebook) do not allow you to define
             * the share title for a URL this way. Facebook will always use the
             * Open Graph tags it finds on the page when it crawls it. You can
             * use the <a href="https://developers.facebook.com/tools/debug/">
             * Facebook Sharing Debugger</a> to test your Open Graph tags.
             *
             * @example
             * ```js
             * app.controller('DoMagicCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     $addthis.share_title('Check this out!');
             * }]);
             * ```
             *
             * @param {string} url The URL to share when a user clicks on share
             *   buttons that don't otherwise speicfy a share URL
             **/
            share_title: function(title) {
                setShareTitle(title);
                queueSmartLayersRefresh($window, $interval);
            },
            /**
             * @ngdoc method
             * @name addthis.$addthis#loaded
             * @methodOf addthis.$addthis
             *
             * @description
             * Returns a promise that resolves once AddThis' `addthis_widget.js`
             * loaded and is ready to use.
             *
             * @example
             * ```js
             * app.controller('LoadMoreCatsCtrl', ['$scope', '$addthis', function($scope, $addthis) {
             *     $addthis.loaded().then(function() {
             *         // addthis_widget.js has loaded
             *     });
             * }]);
             * ```
             *
             * @returns {promise} A promise that resolves once `addthis_widget.js`
             * loaded
             **/
            loaded: function() {
                return scriptLoaded($window, $q, $interval);
            }
        };

        return service;
    };

    /**
     * @ngdoc service
     * @name addthis.$addthisProvider
     * @description
     * A provider for handling AddThis actions before you app has started
     * running.
     **/
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
                 **/
                if (addthis_share.url) {
                    delete addthis_share.url;
                }

                if (addthis_share.title) {
                    delete addthis_share.title;
                }
            }
        }

        /**
         * @ngdoc method
         * @name addthis.$addthisProvider#profile_id
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * Setter function for the site's AddThis profile ID.
         *
         * If the site's profile ID is set somehow through the `addthisProvider`
         * (such as here), then adding addthis_widget.js manually onto your
         * page is optional.
         *
         * @example
         * ```js
         * app.config(function($addthisProvider) {
         *     $addthisProvider.profile_id('your_profile_id_here');
         * });
         * ```
         *
         * @param {string} input The AddThis profile ID to use on this
         *   site.
         * @returns {addthisProvider object} Returns the $addthisProvider object
         * loaded
         **/
        this.profile_id = function(input) {
            profileId = input;
            addthis_config.pubid = input;
            return this;
        };

        /**
         * @ngdoc function
         * @name addthis.$addthisProvider#config
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * Sets the `addthis_config` variable on the page. If the pubid is set
         * it take it an use it elsewhere. Otherwise, it will add in the
         * previously set profile ID (if set) to `addthis_config.pubid`. See
         * <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
         * the addthis_config variable documentation</a> for options.
         *
         * If the site's profile ID is set somehow through the `addthisProvider`
         * (such as here), then adding addthis_widget.js manually onto your
         * page is optional.
         *
         * @example
         * ```js
         * app.config(function($addthisProvider) {
         *     var cfg = {
         *         'services_exclude': 'print,mailto',
         *         'ui_language': 'pl',
         *         'data_track_clickback': false,
         *         'ui_508_compliant': true,
         *         'pubid': 'your_profile_id_here'
         *     };
         *     $addthisProvider.config(cfg);
         * });
         * ```
         *
         * @param {object} input AddThis configuration object. See
         *   <a href="https://www.addthis.com/academy/the-addthis_config-variable/" target="_blank">
         *   the addthis_config variable documentation</a> for options.
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.config = function(input) {
            setAddThisConfig(input);
            return this;
        };

        /**
         * @ngdoc function
         * @name addthis.$addthisProvider#share
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * Sets the `addthis_share` variable on the page. See
         * <a href="https://www.addthis.com/academy/the-addthis_share-variable/" target="_blank">
         * the addthis_share variable documentation</a> for options.
         *
         * @example
         * ```js
         * app.config(function($addthisProvider) {
         *     var share_info = {
         *         'url': 'https://www.addthis.com',
         *         'link': 'AddThis tools rock!',
         *         'passthrough': {
         *             'twitter': {
         *                 'via': 'TWITTER USERNAME'
         *             }
         *         }
         *     };
         *     $addthisProvider.share(share_info);
         * });
         * ```
         *
         * @param {object} input AddThis configuration object. See
         *   <a href="https://www.addthis.com/academy/the-addthis_share-variable/" target="_blank">
         *   the addthis_share variable documentation</a> for options.
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.share = function(addthis_share) {
            setAddThisShare(addthis_config);
            return this;
        };

       /**
         * @ngdoc method
         * @name addthis.$addthisProvider#share_url
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * This is a shortcut to setting the URL through
         * `$addthisProvider.share({'url': 'http://example.com'})`. Sets the URL
         * shared by tools that don't explicitly set one. With the
         * `addthisTool` directive, you may set the URL explicitly using
         * the `share-url` attribute. If not set otherwise, the browsers URL
         * will be used when sharing.
         *
         * ```js
         * app.config(function($addthisProvider) {
         *     $addthisProvider.share_url('https://www.addthis.com');
         * });
         * ```
         *
         * @param {string} url The URL to share when a user clicks on share
         *   buttons that don't otherwise speicfy a share URL
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.share_url = function(url) {
            setShareUrl(url);
            return this;
        };

        /**
         * @ngdoc method
         * @name addthis.$addthisProvider#share_title
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * This is a shortcut to setting the title through
         * `$addthisProvider.share({'title': 'Check this out!'})`. Sets the
         * title shared by tools that don't explicitly set one. With the
         * `addthisTool` directive, you may set the URL explicitly using
         * the `share-title` attribute. If not set otherwise, the
         * document's title will be used when sharing.
         *
         * Note: Some services (such as Facebook) do not allow you to define
         * the share title for a URL this way. Facebook will always use the
         * Open Graph tags it finds on the page when it crawls it. You can
         * use the <a href="https://developers.facebook.com/tools/debug/">
         * Facebook Sharing Debugger</a> to test your Open Graph tags.
         *
         * ```js
         * app.config(function($addthisProvider) {
         *     $addthisProvider.share_title('Check this out!');
         * });
         * ```
         *
         * @param {string} url The URL to share when a user clicks on share
         *   buttons that don't otherwise speicfy a share URL
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.share_title = function(title) {
            setShareTitle(title);
            return this;
        };

        /**
         * @ngdoc method
         * @name addthis.$addthisProvider#disable_auto_add
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * If not added onto the page manually, this module automatically adds
         * `addthis_widget.js` onto the site (if not added manually). Calling
         * this function will disable this functionality. The
         * `addthis_widget.js` script can be added later by calling
         * `$addthis.add`. AddThis tools will not function until
         * `addthis_widget.js` is added onto the page.
         *
         * ```js
         * app.config(function($addthisProvider) {
         *     $addthisProvider.disable_auto_add();
         * });
         * ```
         *
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.disable_auto_add = function() {
            autoAddScript = false;
            return this;
        };

        /**
         * @ngdoc method
         * @name addthis.$addthisProvider#enable_auto_add
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * By default, this module automatically adds `addthis_widget.js` onto
         * the site (if not added manually). The
         * `$addthisProvider.disable_auto_add` method disables this
         * functionality. This method re-enables it.
         *
         * ```js
         * app.config(function($addthisProvider, $envProvider) {
         *     $addthisProvider.disable_auto_add();
         *     if ($envProvider.isProduction()) {
         *         $addthisProvider.enable_auto_add();
         *     }
         * });
         * ```
         *
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.enable_auto_add = function() {
            autoAddScript = true;
            return this;
        };

        /**
         * @ngdoc method
         * @name addthis.$addthisProvider#script_in_head
         * @methodOf addthis.$addthisProvider
         *
         * @description
         * By default, this module automatically adds `addthis_widget.js` onto
         * the site towards the bottom of the DOM (if not added manually). This
         * function will change that and append `addthis_widget.js` onto the
         * DOM's `<HEAD>` element
         *
         * ```js
         * app.config(function($addthisProvider, $envProvider) {
         *     $addthisProvider.disable_auto_add();
         *     if ($envProvider.isProduction()) {
         *         $addthisProvider.enable_auto_add();
         *     }
         * });
         * ```
         *
         * @returns {addthisProvider object} Returns the $addthisProvider object
         **/
        this.script_in_head = function() {
            scriptInFooter = false;
            return this;
        };

        this.$get = addthisService;

        return this;
    };

    /*
     * All these params must also show up in the same order when adding the
     * run to the Angular app
     **/
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


    /**
     * All these params must also show up in the same order when adding the
     * directive to the Angular app
     **/
    var addthisDirective = function($addthis, $timeout) {
        /**
         *
         * @ngdoc directive
         * @name addthis.addthisTool
         *
         * @element ANY
         * @description
         * Use this directive to add an inline AddThis tool onto your page
         *
         * @example
         * This example shows how you would add `addthis_sharing_toolbox` on
         * your page and share url http://www.example.com with the text
         * "Check this out:"
 ```html
 <example
    addthis-tool
    tool-class="'addthis_sharing_toolbox'"
    share-url="'http://www.example.com'"
    share-title="'Check this out:'"
>
</example>
 ```
         * @param {string} toolClass the tool class/id for the AddThis inline
         *   tool you want to add onto the page.
         * @param {string} shareUrl (optional) the url to share when your
         *   visitor clicks on a share button in this tool.
         * @param {string} shareTitle (optional) the string shared with the url
         *   when your visitor clicks on a share button in this tool.
         *
         *   Note: Some services (such as Facebook) do not allow you to define
         *   the share title for a URL this way. Facebook will always use the
         *   Open Graph tags it finds on the page when it crawls it. You can use
         *   the <a href="https://developers.facebook.com/tools/debug/">
         *   Facebook Sharing Debugger</a> to test your Open Graph tags.
         *
         **/
        var directive = {
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
                        $addthis.layers_refresh();
                    });
                };
                recreateToolDiv();

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

        return directive;
    };

    /**
     * @name addthis
     * @ngdoc overview
     * @description
     * Free and Pro AddThis tools to your AngularJS app. This AngularJS module
     * includes a directive, service and provider. It is smart about route/location
     * changes and the AngularJS digest cycles and how they affect AddThis tools.
     * Requires a free AddThis account.
     **/
    var addthisModule = angular.module('addthis', ['ng']);

    /*
     * Except for the last array item, all these items must in the array must
     * show up in the same order the params in addthisProvider
     **/
    addthisModule.provider('$addthis', ['$windowProvider', addthisProvider]);

    /*
     * Except for the last array item, all these items must also show up in the
     * same order the params in addthisRun
     **/
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
     **/
    addthisModule.directive('addthisTool', [
        '$addthis',
        '$timeout',
        addthisDirective
    ]);
    return addthisModule;
}(window, angular));