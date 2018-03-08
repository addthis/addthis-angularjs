# [![official-addthis-angularjs logo](https://github.com/oracle/addthis-angularjs/raw/master/logo_full.png)](https://www.addthis.com)
> Grow your website with tools trusted by over 15 million sites. The AddThis AngularJS module includes a directive, service, and provider. It is smart about route/location changes and the AngularJS digest cycles and how they affect AddThis tools. This module requires a free [AddThis account](https://www.addthis.com/register) and is compatible with free and paid plans. If you're struggling with instructions, we keep the AngularJS install instructions on the [AddThis Academy](http://www.addthis.com/academy/install-addthis-angularjs/) up to date.


## Installation

Visit addthis.com to sign in or sign up before proceeding to the next steps. 

You can install AddThis for AngularJS from addthis.com, NPM, Bower, or Yarn, among other places. Follow the instructions below for your
preferred method.

### NPM

Add it to the project

```
npm install --save @oracle/addthis-angularjs
```

### Yarn

Add it to the project

```
yarn add @oracle/addthis-angularjs
```

### Bower

Add it to the project

```
bower install --save addthis-angularjs
```

### Setup

Include the file in HTML

```html
<script src="path/to/@oracle/addthis-angularjs/dist/official-addthis-angularjs.js"></script>
```

Add `addthis` to the module's dependencies

```js
var app = angular.module('MyApp', ['addthis']);
```

When you create an account on addthis.com, we assign you a profile ID to provide analytics, configure settings, etc. To find your profile
ID, log in to your addthis.com account, select the three dots in the top navigation, select "More," and identify your profile ID in the 
"General" section. Select an option below to set up your profile ID for the module.

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
    $addthisProvider.profileId('YOUR_PROFILE_ID');
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

Replace `addthis_sharing_toolbox` with the name for the AddThis inline share tool desired. If you’re adding inline buttons or Tip Jar buttons, replace `addthis_inline_share_toolbox` with the class for the desired tool. To get the class name, visit your addthis.com dashboard, add a tool, navigate to the Get The Code page, and identify the class name in Step 3 on the Get The Code page.

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


## More Resources

 - [More documention](https://addthis.github.io/addthis-angularjs/)
 - [Example site code](https://github.com/addthis/addthis-angularjs/tree/master/examples). Example 1 is plaing AngularJS, example 2 uses [ngRoute](https://docs.angularjs.org/api/ngRoute) and example 3 uses [AngularUI Router](https://github.com/angular-ui/ui-router)
 - [register for an AddThis account](https://www.addthis.com/register)
 - [addthis_config documentation](https://www.addthis.com/academy/the-addthis_config-variable/)
 - [addthis_share documentation](https://www.addthis.com/academy/the-addthis_share-variable/)
