Package.describe({
	name: 'reisebuddy:redlink',
	version: '0.0.1',
	summary: 'Reisebuddy redlink-integration',
	git: '', //not hosted on separaete git repo yet - use http://github.com/mrsimpson/Rocket.Chat
	documentation: 'README.md'
});

function addDirectory(api, pathInPackage, environment) {
	const PACKAGE_PATH = 'packages/reisebuddy-redlink/';
	const _ = Npm.require('underscore');
	const fs = Npm.require('fs');

	const files = _.compact(_.map(fs.readdirSync(PACKAGE_PATH + pathInPackage), function (filename) {
		return pathInPackage + '/' + filename
	}));
	api.addFiles(files, environment);
}

Package.onUse(function (api) {

	api.versionsFrom('1.2.1');
	api.use('ecmascript');
	api.use('rocketchat:lib');
	api.use('reisebuddy:common');

	addDirectory(api, 'server/methods', 'server');
	addDirectory(api, 'server/lib', 'server');
	addDirectory(api, 'server/hooks', 'server');
	// addDirectory(api, 'client/views', 'client');

	//i18n
	var _ = Npm.require('underscore');
	var fs = Npm.require('fs');
	var tapi18nFiles = _.compact(_.map(fs.readdirSync('packages/reisebuddy-vtiger/i18n'), function(filename) {
		return 'i18n/' + filename;
	}));
	api.addFiles(tapi18nFiles);

	api.use('tap:i18n');
});
