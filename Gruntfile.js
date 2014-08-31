'use strict';

module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-mocha-istanbul');
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    env: {
      dev: {
        NODE_ENV: grunt.option('env') || 'development',
        PORT: '3000'
      }
    },

    jshint: {
      // define the files to lint
      files: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js', 'config.jshint'],
      // configure JSHint (documented at http://www.jshint.com/docs/)
      options: {
        "node": true,
        "indent": 2,
        "globalstrict": true,
        //"expr": true,
        "globals": {
          /* CHAI */
          "describe": false,
          "before": false,
          "after": false,
          "it": false,
          "beforeEach": false,
          "afterEach": false
        }
      }
    },

    mocha_istanbul: {
      coverage: {
        src: 'test', // the folder, not the files,
        options: {
          reporter: 'spec',
          mask: '**/*Spec.js',
          check: {
            statements: '90',
            functions: '85',
            lines: '90'
          }
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*Spec.js']
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'mocha_istanbul']
    }
  });
};