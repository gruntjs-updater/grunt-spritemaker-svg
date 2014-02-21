'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.spritemaker_svg = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualSvg = grunt.file.read('tmp/output.svg');
    var expectedSvg = grunt.file.read('test/expected/output.svg');
    test.equal(actualSvg, expectedSvg, 'Sprites correctly');

    var actualSass = grunt.file.read('tmp/_spritemap.scss');
    var expectedSass = grunt.file.read('test/expected/_spritemap.scss');
    test.equal(actualSass, expectedSass, 'Sprites correctly');

    test.done();
  },
};
