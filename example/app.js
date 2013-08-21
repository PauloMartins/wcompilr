// App settings
var settings = {
	'directories': {
		'coffee': 'public/coffee',
		'less': 'public/less',
		'sass': 'public/sass',
		'js': 'public/js',
		'css': 'public/css'
	},
	'compile': {
		'coffee': ['main1.coffee', 'main2.coffee'],
		'less': ['main1.less', 'main2.less'],
		'sass': ['main11.sass', 'main22.scss']
	},
	'build': {
		'main.min.js': ['main1.js', 'main2.js'],
		'main.min.css': ['main1.css', 'main2.css'],
		'main2.min.css': ['main11.css', 'main22.css']
	}
};

// Call Wcompilr
var wcompilr = require('./wcompilr');

// Init
wcompilr.init(settings);