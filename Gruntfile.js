module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      js: {
        files: [
          {
            expand: true,
            cwd: './src/',
            src: ['js/**/*.js'],
            dest: './dist/'
          }
        ]
      }

    },

    cssmin: {
      combine: {
        files: [
          {
            expand: true,
            cwd: './src/',
            src: ['asset/**/*.css', 'js/**/*.css'],
            dest: './dist/'
          }
        ]
      }
    },

    copy: {
      main: {
        files: [
          { expand: true, cwd: './src/', src: ['asset/**/*.{gif,jpg,png,swf,jpeg,cur}', 'js/**/*.{gif,jpg,png,swf,jpeg,cur}'], dest: './dist/' }
        ]
      }
    },

    clean: {
      dist: {
        force: true,
        src: ['./dist/asset', './dist/js']
      }
    }

  });

  // Load the plugin that provides the "uglify" task.
  // grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-uglify');  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  
  // Default task(s).
  grunt.registerTask('default', ['clean', 'copy', 'uglify', 'cssmin']);

};