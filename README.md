# [![official-addthis-angular](http://cache.addthiscdn.com/www/160830bfaefda/style/images/wrapper/addthis-logo.svg)](https://www.addthis.com) official-addthis-angular
> Add free and Pro AddThis tools to an AngularJS app. This AngularJS module includes a directive, service and provider. It is smart about route/location changes and the AngularJS digest cycles and how they affect AddThis tools. Requires a free [AddThis account](https://www.addthis.com/register).


## Installation

### NPM

Add it to the project

```
npm install --save official-addthis-angular
```

### Bower

Add it to the project

```
bower install --save official-addthis-angular
```

### Setup

Include the file in HTML

```html
<script src="path/to/official-addthis-angular/dist/official-addthis-angular.js"></script>
```

Add `addthis` to the module's dependencies

```js
var app = angular.module('MyApp', ['addthis']);
```

#### Set a Profile ID: Option 1: HTML

Include `addthis_widget.js` in HTML with an AddThis profile ID. Replace `YOUR_PROFILE_ID` below with a profile ID.

```html
<!-- Go to www.addthis.com/dashboard to customize your tools -->
<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=YOUR_PROFILE_ID"></script>
```

Get a profile ID with a free [AddThis account](https://www.addthis.com/register).

#### Set a Profile ID: Option 2: `$addthisProvider.profile_id`
Set the profile ID and just the profile ID.

```js
app.config(function($addthisProvider) {
    $addthisProvider.profile_id('YOUR_PROFILE_ID');
});
```

Get a profile ID with a free [AddThis account](https://www.addthis.com/register).

#### Set a Profile ID: Option 3: `$addthisProvider.config`
Set other `addthis_config` settings with the profile ID. See <a href="https://www.addthis.com/academy/the-addthis_config-variable/">addthis_config documentation</a> for additional options.

```js
app.config(function($addthisProvider) {
    var cfg = {
        'pubid': 'YOUR_PROFILE_ID'
    };
    $addthisProvider.config(cfg);
});
```
Get a profile ID with a free [AddThis account](https://www.addthis.com/register).

## Usage

### Basic
```html
<div addthis-tool tool-class="'addthis_sharing_toolbox'">
```

Replace `addthis_sharing_toolbox` with the name for the AddThis inline tool desired.

### Specify a URL or title other than the current page's

#### Individually Per Tool
```html
<div
    addthis-tool
    tool-class="'addthis_sharing_toolbox'"
    share-url="'http://example.com'"
    share-title="'Check this out:'"
>
```

Replace `addthis_sharing_toolbox` with the name for the AddThis inline share tool desired.

Replace `http://example.com` with the URL to share when a visitor clicks on one of the sharing buttons, or, alternately, leave the `share-url` attribute out completely. You can use a variable here, ex: `share-url="shareUrlFromMyScope"`.

Replace `Check this out:` with the title to share when a visitor clicks on one of the sharing buttons, or, alternately, leave the `share-title` attribute out completely. You can use a variable here, ex: `share-title="shareTitleFromMyScope"`.

Note: Some services (such as Facebook) do not allow you to define the share title for a URL. Facebook will always use the Open Graph tags it finds on the page when it crawls it. You can use the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to test your Open Graph tags.

#### For Every Tool

```js
app.controller('MyCtrl', ['$scope', '$addthis', function($scope, $addthis) {
    $addthis.share_url('http://example.com');
    $addthis.share_title('Check this out:');
}]);
```

Replace `http://example.com` with the URL to share when a visitor clicks on one of the sharing buttons.

Replace `Check this out:` with the title to share when a visitor clicks on one of the sharing buttons.

This will not override the share URL or title for tools using the `share-url` and `share-title` directive attributes.

## [More documention](http://www.addthis.com/angular/docs/)

## Demo Sites & More Example Code

Example Site 1
 - [demo](http://www.addthis.com/angular/test/example1/)
 - [code](http://www.github.com/addthis/official-addthis-angular/test/example1)

Example Site 2 using [ngAngular](https://docs.angularjs.org/api/ngRoute)
 - [demo](http://www.addthis.com/angular/test/example2/)
 - [code](http://www.github.com/addthis/official-addthis-angular/test/example2)

Example Site 3 using [AngularUI Router](https://github.com/angular-ui/ui-router)
This site has the most examples, and none of them are specific to [AngularUI Router](https://github.com/angular-ui/ui-router)
 - [demo](http://www.addthis.com/angular/test/example3/)
 - [code](http://www.github.com/addthis/official-addthis-angular/test/example3)

## Other Useful Links
 - [register for an AddThis account](https://www.addthis.com/register)
 - [addthis_config documentation](https://www.addthis.com/academy/the-addthis_config-variable/)
 - [addthis_share documentation](https://www.addthis.com/academy/the-addthis_share-variable/)