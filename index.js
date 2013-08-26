/*
* Wcompilr - Watches and compiles coffescript, sass and less
* author: Paulo Martins <@m4rtinsp>
* version: 0.0.6
*/
var fs 		= require('fs'),
	watch 	= require('node-watch'),
	compile = require('./lib/compile.js'),
	build 	= require('./lib/build.js');

exports.init = function(settings) {
	'use strict';

	// Start
	console.log('Wcompilr Start');
	
	var settings = require('./lib/settings.js').init(settings);

	switch(process.argv[2]) {
		case 'watch':
			watchFiles(settings);
			break;
		case 'build':
			buildFiles(settings);
			break;
		default:
			console.log('Invalid command: Choose build or watch');
	}
}

watchFiles = function(settings) {
	'use strict';

	if (settings.compile !== undefined) {
		console.log('Watching...\r\n');
		
		var files = checkFiles(settings.compile, settings);

		if (files.length > 0) {
			watch(files, function(filename) {
				compile.file(filename, settings);
			});
		}
	}
}

buildFiles = function(settings) {
	'use strict';

	if (settings.build !== undefined) {
		console.log('Building...\r\n');
		build.files(settings);
	}
}

checkFiles = function(list, settings) {
	var files = [];

	for (var preprocessor in list) {
		for (var file in list[preprocessor]) {
			var item = list[preprocessor][file];
			var type = item.split('.')[1];

			if (fs.existsSync(settings.pathByType(type) + item)) {
				files.push(settings.pathByType(type) + item);
			} else {
				console.log('File not found: ' + settings.pathByType(type) + item);
			}
		}
	}

	return files;
}