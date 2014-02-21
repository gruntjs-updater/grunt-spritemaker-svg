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
			'sassFile': false
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

			var packeddone = false;
			var streamdone = false;

			function maybedone() {
				if (packeddone && streamdone) {
					done();
				}
			}

			generated.on('packed', function(data) {
				var output = '';
				output += '/**\n';
				output += ' * Usage:\n';
				output += ' *\n';
				output += ' * .sprited-thing {\n';
				output += ' *   width: sprite-width(sprite-name)*1px;\n';
				output += ' *   height: sprite-height(sprite-name)*1px;\n';
				output += ' *   background: url(/path/to/sprite) no-repeat sprite-background-position(sprite-name);\n';
				output += ' *\n';
				output += ' *   &:hover,\n';
				output += ' *   &:focus {\n';
				output += ' *     background-position: sprite-background-position(other-sprite);\n';
				output += ' *   }\n';
				output += ' * }\n';
				output += ' *\n';
				output += ' */\n';

				var spritex = '@function sprite-x($name) {\n';
				var spritey = '@function sprite-y($name) {\n';
				var spritewidth = '@function sprite-width($name) {\n';
				var spriteheight = '@function sprite-height($name) {\n';
				data.items.forEach(function(item) {
					spritex += "  @if $name == '" + item.id + "' { @return " + item.x + "; }\n";
					spritey += "  @if $name == '" + item.id + "' { @return " + item.y + "; }\n";
					spritewidth += "  @if $name == '" + item.id + "' { @return " + item.width + "; }\n";
					spriteheight += "  @if $name == '" + item.id + "' { @return " + item.height + "; }\n";
				});
				spritex += '}\n';
				spritey += '}\n';
				spritewidth += '}\n';
				spriteheight += '}\n';
				output += spritex + spritey + spritewidth + spriteheight;
				output += '@function sprite-background-position($name) {\n';
				output += '  @return (sprite-x($name)*-1px) (sprite-y($name)*-1px);\n';
				output += '}\n';

				if (options.sassFile) {
					grunt.file.write(options.sassFile, output);
					grunt.log.writeln('File "' + options.sassFile + '" created (sprite map).');
				}

				packeddone = true;
				maybedone();
			});

			generated.on('end', function() {
				grunt.log.writeln('File "' + f.dest + '" created.');
				streamdone = true;
				maybedone();
			});
		});
	});

};
