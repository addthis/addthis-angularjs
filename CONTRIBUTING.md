
# Contribution Guide

## Reporting Bugs
Having issues or want to report a bug? Email (help@addthis.com)[mailto:help@addthis.com].

## Dependencies
Make sure you have the following installed:
 - Node.js
 - npm
 - Git

Use npm to install the following:
 - gulp `npm install -g gulp`

## Installation
Get the source code by cloning to git repository via:
```
git clone https://github.com/addthis/official-addthis-angular
```

Navigate into the git repository and in stall all the needed dependencies via npm:
```
npm install
```

## Building
There are a few commands to help automate the development process

### <code>gulp watch</code>
Rebuilds things as files change

### <code>gulp build</code>
Builds everything, including documentation

### <code>gulp jslint</code>
Lints the JavaScript

### <code>gulp docs</code>
Builds just the documentaiton

### <code>node server.js</code>
Serves all the code, documentation and examples sites locally at `http://localhost:3002`

Built Code: http://localhost:3002/dist/official-addthis-angular.js
Documentation: http://localhost:3002/docs/
Example Site 1: http://localhost:3002/test/example1/
Example Site 2: http://localhost:3002/test/example2/
Example Site 3: http://localhost:3002/test/example3/