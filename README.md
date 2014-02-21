# grunt-spritemaker-svg

> Create SVG sprite maps from SVG sprites

## Getting Started

This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out
the [Getting Started](http://gruntjs.com/getting-started) guide, as it
explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as
well as install and use Grunt plugins. Once you're familiar with that process,
you may install this plugin with this command:

```shell
npm install grunt-spritemaker-svg --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile
with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-spritemaker-svg');
```

## The "spritemakersvg" task

### Overview

In your project's Gruntfile, add a section named `spritemakersvg` to the data
object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  spritemakersvg: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.sassFile

Type: `String`
Default value: `',  '`

The sass file that gets outputted.

### Usage Examples

#### Default Options

In this example, the default options are used to do something with whatever.
So if the `testing` file has the content `Testing` and the `123` file had the
content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  spritemakersvg: {
    options: {},
    files: {
      'images/sprite.svg': ['images/sprites/*.svg'],
    },
  },
});
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style. Add unit tests for any new or changed functionality. Lint and test your
code using [Grunt](http://gruntjs.com/).
