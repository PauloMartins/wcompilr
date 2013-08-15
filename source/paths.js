/*
* Wcompilr - Watches and compiles coffescript, sass and less
* author: Paulo Martins <phmartins6 AT gmail DOT com>
* version: 0.0.3
*/

if (process.argv[0] === 'node') {
	console.log('Wcompilr: Don\'t run this file directly. Run the wcompilr.js');
	return false;
}

// Export variable
exports.root = set();

function set() {
	'use strict';

	var path 				= require('path');
	var parent 				= path.dirname(require.main.filename);
	var parent_dorectory 	= path.dirname(parent);
	var parent_dorectory 	= parent_dorectory.split(path.sep);
		parent_dorectory 	= parent_dorectory[ (parent_dorectory.length-1) ];

	if (parent_dorectory == 'node_modules') {
		parent = path.dirname(parent);
	}

	return parent + path.sep;
}