module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['src/**/*.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        src: "build/multigraph.js",
        dest: "build/multigraph-min-grunt.js"
      }
    },
    replace: {
      build: {
        options: {
          patterns: [
            {
              match: '.which.',
              replacement: '.'
            },
            {
              match: '.eachOfWhich.',
              replacement: '.'
            },
            {
              match: '.and.',
              replacement: '.'
            }
          ]
        },
        files: [
          {
              src: ['build/multigraph-min-grunt.js'],
              dest: 'build/'
          }
        ]
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-replace');

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['uglify', 'replace']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
