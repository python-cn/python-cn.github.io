module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            options: {
                separator: ';\n\n'
            },
            dist: {
                src: ['bower_components/jquery/dist/jquery.min.js',
                      'bower_components/angular/angular.min.js',
                      'bower_components/marked/lib/marked.js',
                      'bower_components/angular-route/angular-route.min.js',
                      'bower_components/angular-animate/angular-animate.min.js',
                      'bower_components/underscore/underscore.js',
                      'bower_components/underscore.string/dist/underscore.string.min.js'
                     ],
                dest: 'bower_components/concat.js'
            }
        },
        uglify: {
            build: {
                src: 'bower_components/concat.js',
                dest: 'bower_components/concat.min.js'
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('default', ['concat', 'uglify']);
}
