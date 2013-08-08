/*
* M4 Compiler - Coffe, Sass and Less
* author: Paulo Martins <phmartins6@gmail.com>
* version: 0.1
*/
var modules = []
var child = require('child_process');
var exec = child.exec;

// Start
console.log('- M4 Compiler');

// Get command line
var params = process.argv;

// Remove node command and file
params.shift();
params.shift();

// Call function by param
if(params.length==0)
	console.log('Choose an action: install, watch or production');
else {
	if(params[0]=='install')
		installModules();
	else if(params[0]=='watch' && checkModules())
		watchProject();
	else if(params[0]=='production' && checkModules())
		compileToProduction();
}

// Install all modules
function installModules() {
	console.log('Checking modules...');

	if(!checkModules(true)) {
		var i = 0;
		
		console.log('Modules not found: ' + modules.join(', '));
		console.log('Installing modules...');

		for(i; i<modules.length; i++) {
			exec('npm install ' + modules[i], function(err, stdout, stderr){
				console.log('stdcmd: ' + stderr);
				if(err) console.log('Error: ' + err);
			});
		}
	}
	else
		console.log('All modules are installed');
}

// Check all modules
function checkModules(onlyCheck) {
	if(typeof onlyCheck == undefined)
		onlyCheck = false;

	try { require('node-watch'); }
	catch(e) { modules.push('node-watch') }

	try { require('node-sass'); }
	catch(e) { modules.push('node-sass') }

	try { require('less'); }
	catch(e) { modules.push('less') }

	try { require('coffee-script'); }
	catch(e) { modules.push('coffee-script') }

	try { require('uglify-js'); }
	catch(e) { modules.push('uglify-js') }

	if(modules.length>0) {
		if(!onlyCheck) {
			console.log('Some modules were not found: ' + modules.join(', '));
			console.log('Execute node m4-compiler install');
		}

		return false;
	}
	else
		return true;
}

// Watch files for compile
function watchProject() {
	console.log('Watching...');
	require('./source/watch.js');
}

// Compile and minify files
function compileToProduction() {
	console.log('Preparing files...');
	require('./source/build.js');
}
