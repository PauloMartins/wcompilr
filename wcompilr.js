/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true,
unused:true, curly:true, browser:false, indent:4, maxerr:50, jquery: true */

/*global console, require*/

/*
* Wcompilr - Coffe, Sass and Less watcher and compiler
* author: Paulo Martins <phmartins6@gmail.com>
* version: 0.1
*/
var child = require('child_process'),
	exec = child.exec,
	modules = [];

// Start
console.log('- Wcompilr');

// Get command line
var params = process.argv;

// Remove node command and file
params.shift();
params.shift();

// Call function by param
if (params.length === 0) {
	console.log('Choose an action: install, watch or build');
} else {
	if (params[0] === 'install') {
		installModules();
	} else if (params[0] === 'watch' && checkModules()) {
		watchProject();
	} else if (params[0] === 'build' && checkModules()) {
		bildProject();
	}
}

// Install all modules
function installModules() {
	'use strict';

	console.log('Checking modules...');

	if (!checkModules(true)) {
		var i = 0;

		console.log('Modules not found: ' + modules.join(', '));
		console.log('Installing modules...');

		for (i; i < modules.length; i++) {
			exec('npm install ' + modules[i], function (err, stdout, stderr) {
				console.log('stdcmd: ' + stderr);
				if (err) {
					console.log('Error: ' + err);
				}
			});
		}
	} else {
		console.log('All modules are installed');
	}
}

// Check all modules
function checkModules(onlyCheck) {
	'use strict';

	if (typeof onlyCheck === 'undefined') {
		onlyCheck = false;
	}

	try {
		require('node-sass');
	} catch (e) {
		modules.push('node-sass');
	}

	try {
		require('less');
	} catch (e) {
		modules.push('less');
	}

	try {
		require('coffee-script');
	} catch (e) {
		modules.push('coffee-script');
	}

	try {
		require('uglify-js');
	} catch (e) {
		modules.push('uglify-js');
	}

	if (modules.length > 0) {
		if (!onlyCheck) {
			console.log('Some modules were not found: ' + modules.join(', '));
			console.log('Execute node wcompilr.js install');
		}

		return false;
	} else {
		return true;
	}
}

// Watch files for compile
function watchProject() {
	'use strict';

	console.log('Watching...');

	var watch = require('./source/watch.js');

	watch.init();
}

// Compile and minify files
function bildProject() {
	'use strict';

	console.log('Preparing files...');

	var build = require('./source/build.js');

	build.init();
}