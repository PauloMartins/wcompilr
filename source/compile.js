/*
* M4 Compiler - Coffe, Sass and Less
* author: Paulo Martins <phmartins6@gmail.com>
* version: 0.1
*/
if(process.argv[0]=='node') {
	console.log('M4 Compiler: Not run this file directly. Run the m4-compiler.js');
	return false;
}

// Start
var fs 		= require('fs'),
	sass 	= require('node-sass'),
	less 	= require('less'),
	coffee 	= require('coffee-script'),
	uglify 	= require('uglify-js'),
	config 	= require('../config.json').config;

// Compile Files
compileFile = function(file, compressed) {
	var type = file.split('.')[1];
	compressed = typeof compressed == 'undefined' ? false : true;

	switch(type) {
		case 'sass':
		case 'scss':
			compileSass(file, compressed);
			break;
		case 'less':
			compileLess(file, compressed);
			break;
		case 'coffee':
			compileCoffee(file, compressed);
			break;
	}
}

compileSass = function(file, compressed) {
	sass.render({
		file: config.css.input_dir + file,
		outputStyle: compressed ? 'compressed' : 'nested',
		success: function(content){
			var filePath = config.css.output_dir + config.css.output_file;
			var directory = filePath.split(config.css.output_file)[0];

			if(fs.existsSync(directory)) {
				fs.writeFile(filePath, content);
				projectLog('updated', filePath);
			}
			else
				console.log('Directory not found: '+ directory);
		},
		error: function(error) {
			console.log(error);
		}
	});
}

compileLess = function(file, compressed) {
	var parser = new(less.Parser);

	fs.readFile(config.css.input_dir + file, 'utf8', function(err, data){
		parser.parse(data, function(err, tree){
			var content = tree.toCSS({ compress: compressed });
			var filePath = config.css.output_dir + config.css.output_file;
			var directory = filePath.split(config.css.output_file)[0];
			
			if(fs.existsSync(directory)) {
				fs.writeFile(filePath, content, function(err){
					if(err) { console.log(err) }
					projectLog('updated', filePath);
				});
			}
			else
				console.log('Directory not found: '+ directory);
		});
	});
}

compileCoffee = function(file, compressed) {
	fs.readFile(config.js.input_dir + file, 'utf8', function(err, data){
		var content = coffee.compile(data);
		var filePath = config.js.output_dir + config.js.output_file;
		var directory = filePath.split(config.js.output_file)[0];

		if(fs.existsSync(directory)) {
			fs.writeFile(filePath, content, function(err){
				if(err) { console.log(err) }

				if(compressed) {
					content = uglify.minify(filePath);
					fs.writeFile(filePath, content.code);
				}

				projectLog('updated', filePath);
			});
		}
		else
			console.log('Directory not found: '+ directory);
	});
}

// Log actions
projectLog = function(action, file) {
	console.log(action, '--------------------', file);
}