var fs 			= require('fs'),
	compressor 	= require('node-minify'),
	settings,
	type;

exports.files = function(sett) {
	settings = sett;

	for (var output in settings.build) {
		type = output.split('.');
		type = type[type.length-1];

		build(output);
	}
}

build = function(output) {
	var directory, outputFile, files = [];

	directory = settings.pathByType(type);
	outputFile = directory + output;

	for (var i in settings.build[output]) {
		var file = directory + settings.build[output][i];

		if (fs.existsSync(file)) {
			files.push(file);
		} else {
			console.log('File not found: ' + file);
		}
	}

	if (files.length > 0) {
		new compressor.minify({
			type: 'yui-' + type,
			fileIn: files,
			fileOut: outputFile,
			callback: function(err) {
				if (err) { console.log(err) }
				console.log('Generated:', outputFile);
			}
		});
	}
}