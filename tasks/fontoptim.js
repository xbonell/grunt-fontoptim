/**
 * Generates CSS with WOFF(2) fonts embedded as Base64
 *
 * @author Artem Sapegin (http://sapegin.me)
 */

module.exports = function(grunt) {
	'use strict';

	var fs = require('fs');
	var path = require('path');
	var fontoptim = require('fontoptim');

	grunt.registerMultiTask('fontoptim', 'Generate CSS files with WOFF(2) fonts embedded as Base64.', function() {
		var options = this.options({
			fontFamily: this.target
		});

		// Read source files
		var fonts = {};
		this.filesSrc.forEach(function(filename) {
			fonts[path.basename(filename)] = fs.readFileSync(filename);
		});

		// Generate CSS
		var formatsCss = fontoptim(fonts, options);

		// Save CSS
		for (var format in formatsCss) {
			var filename = this.data.dest + '.' + format + '.css';
			grunt.file.write(filename, formatsCss[format]);
			grunt.log.writeln('File ' + filename.cyan + ' created.');
		}
	});
};