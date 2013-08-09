/*
* M4 Compiler - Coffe, Sass and Less
* author: Paulo Martins <phmartins6@gmail.com>
* version: 0.1
*/
if(process.argv[0]=='node') {
	console.log('Wcompilr: Don\'t run this file directly. Run the wcompilr.js');
	return false;
}

// Start
var fs 		= require('fs'),
	config 	= require('../config.json').config,
	files	= [];

// Build functions
require('./compile.js');

// Define files
if(typeof config.css !== 'undefined')
	files.push(config.css.input_file);
if(typeof config.js !== 'undefined')
	files.push(config.js.input_file);

// Compile
if(files.length>0) {
	var i = 0;

	for(i; i<files.length; i++) {
		compileFile(files[i], true);
	}
}