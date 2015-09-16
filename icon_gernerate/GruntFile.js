/**
 * Created by zx000 on 2015/2/6.
 */

module.exports = function(grunt) {
    'use strict';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: "compressed"
                },
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ["**/*.scss"],
                    dest: "css/",
                    ext: '.css'
                }]
            }
        },
        watch: {
            css: {
                files: ['scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            }
        },
        browserSync: {
            bsFiles: {
                src: ['./css/*.css','./js/*.js', './*.html']
            },
            options: {
                server: {
                    baseDir: "./"
                },
                watchTask: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['browserSync', 'watch:css']);
};