module.exports = function(grunt) {
  grunt.initConfig({
    csslint: {
        all: ['app/**/*.css']
    },
    jshint: {
        all: ['*.js', 'app/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');

  grunt.registerTask('default', ['csslint', 'jshint']);
};