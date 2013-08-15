/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true,
unused:true, curly:true, browser:false, indent:4, maxerr:50, jquery: true */

/*
* Wcompilr - Watches and compiles coffescript, sass and less
* author: Paulo Martins <phmartins6 AT gmail DOT com>
* version: 0.0.3
*/

if (process.argv[0] === 'node') {
	console.log('Wcompilr: Don\'t run this file directly. Run the wcompilr.js');
	return false;
}

exports.init = function () {
	'use strict';

	var fs 		= require('fs'),
		watch 	= require('node-watch'),
		config 	= require('../config.json').config,
		compile = require('./compile.js'),
		paths 	= require('./paths.js'),
		files 	= [];

	// Define files
	if (typeof config.css !== 'undefined') {
		var f = paths.root + config.css.input_dir + config.css.input_file;

		if (fs.existsSync(f)) {
			console.log('Watching file: '+ f);
			files.push(f);
		} else {
			console.log('File not found: '+ f);
		}
	}

	if (typeof config.js !== 'undefined') {
		var f = paths.root + config.js.input_dir + config.js.input_file;

		if (fs.existsSync(f)) {
			console.log('Watching file: '+ f);
			files.push(f);
		} else {
			console.log('File not found: '+ f);
		}
	}

	// Watch
	if (files.length > 0) {
		watch(files, function(filename){
			compile.file(filename);
		});
	}
}