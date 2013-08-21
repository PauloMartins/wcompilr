exports.init = function(settings) {
	'use strict';

	if (settings === undefined) {
		console.log('Settings are required, check: https://github.com/PauloMartins/wcompilr');
		return false;
	} else if (settings.directories === undefined || settings.compile === undefined || settings.build === undefined) {
		console.log('Invalid settings, check: https://github.com/PauloMartins/wcompilr');
		return false;
	}

	var path = require('path');

	// Get file in execution and defined root's path
	settings.directories.root = process.argv[1].split(path.sep);
	settings.directories.root.pop();
	settings.directories.root = settings.directories.root.join(path.sep) + path.sep;

	settings.pathByType = function(type) {
		switch(type) {
			case 'coffee':
				return settings.directories.coffee.replace('/', path.sep) + path.sep;
				break;
			case 'sass':
			case 'scss':
				return settings.directories.sass.replace('/', path.sep) + path.sep;
				break;
			case 'less':
				return settings.directories.less.replace('/', path.sep) + path.sep;
				break;
			case 'js':
				return settings.directories.js.replace('/', path.sep) + path.sep;
				break;
			case 'css':
				return settings.directories.css.replace('/', path.sep) + path.sep;
				break;
		}
	}

	return settings;
}