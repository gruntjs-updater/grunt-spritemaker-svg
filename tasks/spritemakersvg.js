/*
 * grunt-spritemaker-svg
 * https://github.com/bryan/grunt-spritemaker-svg
 *
 * Copyright (c) 2014 Bryan Burgers
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var path = require('path');
var spritemaker = require('spritemaker-svg');

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks

	grunt.registerMultiTask('spritemakersvg', 'Create SVG sprite maps from SVG sprites', function() {
		var done = this.async();

		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
		});

		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				return {
					id: path.basename(filepath, '.svg'),
					stream: fs.createReadStream(filepath)
				};
			});

			grunt.file.mkdir(path.dirname(f.dest));
			var output = fs.createWriteStream(f.dest);

			var generated = spritemaker(src);
			generated.pipe(output);

			generated.on('end', function() {
				done(true);
			});
		});
	});

};
