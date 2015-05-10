module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-env');

  grunt.initConfig({
    env: {
      test: {
        NODE_ENV: 'test'
      },
      stage: {
        NODE_ENV: 'stage'
      },
      release: {
        NODE_ENV: 'release'
      },
      production: {
        NODE_ENV: 'production'
      }
    },
    mochaTest: {
      test: {
        options: {
          reporter: 'nyan',
          quiet: false, // Optionally suppress output to standard out (defaults to false)
          clearRequireCache: false, // Optionally clear the require cache before running tests (defaults to false)
          require: 'tests/index.js'
        },
        src: ['tests/**/test.*.js']
      }
    }
  });

  grunt.registerTask('test', ['env:test', 'mochaTest']);
};
