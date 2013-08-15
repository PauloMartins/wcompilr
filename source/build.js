/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true,
unused:true, curly:true, browser:false, indent:4, maxerr:50, jquery: true */

/*
* Wcompilr - Watches and compiles coffescript, sass and less
* author: Paulo Martins <phmartins6 AT gmail DOT com>
* version: 0.1
*/
if (process.argv[0] === 'node') {
	console.log('Wcompilr: Don\'t run this file directly. Run the wcompilr.js');
	return false;
}

exports.init = function() {
	var fs 		= require('fs'),
		config 	= require('../config.json').config,
		compile = require('./compile.js'),
		files	= [];

	// Define files
	if(typeof config.css !== 'undefined')
		files.push(config.css.input_file);
	if(typeof config.js !== 'undefined')
		files.push(config.js.input_file);

	// Compile
	if(files.length>0) {
		var i = 0;

		for(i; i<files.length; i++) {
			compile.file(files[i], true);
		}
	}
}