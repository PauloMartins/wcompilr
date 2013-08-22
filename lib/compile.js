/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, 
unused:true, curly:true, browser:true, node:true, indent:4, maxerr:50 */

/*global require*/

var fs = require('fs'),
	sass = require('node-sass'),
	less = require('less'),
	coffee	= require('coffee-script'),
	file,
	type,
	settings,
	compileSass,
	compileLess,
	compileCoffee;

exports.file = function(fileName, sett) {
	'use strict';

	file = fileName;
	type = file.split('.')[1];
	settings = sett;

	switch(type) {
	case 'sass':
	case 'scss':
		compileSass();
		break;
	case 'less':
		compileLess();
		break;
	case 'coffee':
		compileCoffee();
		break;
	}
};

compileSass = function() {
	'use strict';

	sass.render({
		file: file,
		outputStyle: 'nested',
		success: function(content) {
			var newFile = file.replace(settings.directories.sass, settings.directories.css).replace(type, 'css');

			fs.writeFile(newFile, content, function(err){
				if (err) {
					console.log(err);
				}
				console.log('Updated:', newFile);
			});
		},
		error: function(err) {
			console.log(err);
		}
	});
};

compileLess = function() {
	'use strict';

	var parser = new (less.Parser);

	fs.readFile(file, 'utf8', function(err, data) {
		parser.parse(data, function(err, tree){
			var newFile = file.replace(settings.directories.less, settings.directories.css).replace(type, 'css');
			var content = tree.toCSS();
			
			fs.writeFile(newFile, content, function(err){
				if (err) {
					console.log(err);
				}
				console.log('Updated:', newFile);
			});
		});
	});
};

compileCoffee = function() {
	'use strict';

	fs.readFile(file, 'utf8', function(err, data) {
		var newFile = file.replace(settings.directories.coffee, settings.directories.js).replace(type, 'js');
		var content = coffee.compile(data);

		fs.writeFile(newFile, content, function(err){
			if (err) {
				console.log(err);
			}
			console.log('Updated:', newFile);
		});
	});
};
