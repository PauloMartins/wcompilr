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

exports.file = function(file, compressed) {
	var fs 			= require('fs'),
		sass 		= require('node-sass'),
		less 		= require('less'),
		coffee 		= require('coffee-script'),
		uglify 		= require('uglify-js'),
		config 		= require('../config.json').config,
		type 		= file.split('.')[1],
		compressed 	= typeof compressed == 'undefined' ? false : true;

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

	function compileSass(file, compressed) {
		if (checkFileOrDirectory(file, 'File')) {
			sass.render({
				file: file,
				outputStyle: compressed ? 'compressed' : 'nested',
				success: function(content){
					var filePath = config.css.output_dir + config.css.output_file;
					var directory = filePath.split(config.css.output_file)[0];

					if (checkFileOrDirectory(directory, 'Directory')) {
						fs.writeFile(filePath, content);
						projectLog('updated', filePath);
					}
				},
				error: function(error) {
					console.log(error);
				}
			});
		}
	}

	function compileLess(file, compressed) {
		var parser = new(less.Parser);

		if (checkFileOrDirectory(file, 'File')) {
			fs.readFile(file, 'utf8', function(err, data){
				parser.parse(data, function(err, tree){
					var content = tree.toCSS({ compress: compressed });
					var filePath = config.css.output_dir + config.css.output_file;
					var directory = filePath.split(config.css.output_file)[0];

					if (checkFileOrDirectory(directory, 'Directory')) {
						fs.writeFile(filePath, content, function(err){
							if (err) { console.log(err) }
							projectLog('updated', filePath);
						});
					}
				});
			});
		}
	}

	function compileCoffee(file, compressed) {
		var filePath = config.js.output_dir + config.js.output_file;
		var directory = filePath.split(config.js.output_file)[0];

		if (checkFileOrDirectory(file, 'File')) {
			fs.readFile(file, 'utf8', function(err, data){
				var content = coffee.compile(data);
				
				if (checkFileOrDirectory(directory, 'Directory')) {
					fs.writeFile(filePath, content, function(err){
						if (err) { console.log(err) }

						if (compressed) {
							content = uglify.minify(filePath);
							fs.writeFile(filePath, content.code);
						}

						projectLog('updated', filePath);
					});
				}
			});
		}
	}

	function checkFileOrDirectory(file, type) {
		if (fs.existsSync(file)) {
			return true;
		} else {
			console.log(type, 'not found:', file);
			return false;
		}
	}

	function projectLog(action, file) {
		console.log(action, '--------------------', file);
	}
}