/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true,
unused:true, curly:true, browser:false, indent:4, maxerr:50, jquery: true */

/*global console*/

/*
* M4 Compiler - Coffe, Sass and Less watcher and compiler
* author: Paulo Martins <phmartins6@gmail.com>
* version: 0.1
*/
if (process.argv[0] === 'node') {
	console.log('Wcompilr: Don\'t run this file directly. Run the wcompilr.js');
	return false;
}

exports.init = function () {
	'use strict';

	var fs = require('fs'),
		config = require('../config.json').config,
		compile = require('./compile.js'),
		files = [];

	// Define files
	if (typeof config.css !== 'undefined') {
		files.push(config.css.input_dir + config.css.input_file);
	}

	if (typeof config.js !== 'undefined') {
		files.push(config.js.input_dir + config.js.input_file);
	}

	// Watch
	if (files.length > 0) {
		var i = 0;

		for (i; i < files.length; i++) {
			var currentFile = files[i];

			fs.watch(currentFile, function (e, file) {
				compile.file(file);
			});
		}
	} else {
		console.log('File not found: ' + currentFile);
	}
}