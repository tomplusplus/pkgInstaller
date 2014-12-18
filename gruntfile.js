'use strict';

module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },

            js: {
                files: ['js/**/*.js'],
                tasks: ['newer:jshint', 'copy:js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['views/**/*.html'],
                tasks: ['copy:html'],
                options: {
                    livereload: true
                }
            },
            css: {
                files: ['less/**/*.less'],
                tasks: ['less','copy:css'],
                options: {
                    livereload: true
                }
            }
        },

        less: {
            app: {
                files: {
                    'dist/style/main.css': ['less/app.less']
                }
            }
        },


        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                open: 'localhost:9000',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: 'http://us-local.cricut.com:9000',
                    base: [
                        'dist'
                    ]
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        'dist'
                    ]
                }
            },
            local: {
                options: {
                    base: 'dist'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            app: [
                'Gruntfile.js',
                'js/**/*.js'
            ]
        },
        clean: {
            app: {
                files: [{
                    dot: true,
                    src: [
                        'dist/**/*.*',
                        'dist/.git*'
                    ]
                }]
            }
        },

        fileblocks: {
            app: {
                options: {
                    cwd: '',
                    rebuild: true,
                    removeFiles: true
                },
                src: 'dist/index.html',
                blocks: {
                    'js': { src: ['js/app.js'] },
                    'css': { src: 'style/**/*.css' }
                }
            }
        },


        cssmin: {
            options: {
                root: '<%= kepler.app %>'
            }
        },

        imagemin: {
            app: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: 'dist/images'
                }]
            }
        },

        svgmin: {

            app: {
                files: [{
                    expand: true,
                    cwd: 'images',
                    src: '{,*/}*.svg',
                    dest: 'dist/images'
                }]
            }
        },

        htmlmin: {
            app: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: 'dist'
                }]
            }
        },
        uglify: {
            app: {
                files: {
                    '<%= kepler.local %>/scripts/scripts.js': [
                        '<%= kepler.local %>/scripts/scripts.js'
                    ]
                }
            }
        },
           app: {
             files: {
               '<%= kepler.local %>/scripts/scripts.js': [
                 '<%= kepler.local %>/scripts/scripts.js'
               ]
             }
           },
        copy: {
            app: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: 'dist',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/**/*.html',
                        'js/**/*.js',
                        'images/**/*'
                    ]
                }]
            },
            js: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: 'dist',
                    src: ['js/**/*.js']
                }]
            },
            html: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '',
                    dest: 'dist',
                    src: [
                        'views/**/*.html'
                    ]
                }]
            }
        },

        concat: {
           app: {}
        },

        // *******  Test settings ********************
        browserify: {
            dist: {
                files: {
                    'dist/app.js': [
                        'dist/js/**/*.js'
                    ]
                }
            },
            //make build for
            specs: {
                files: {
                    'dist/specs.js': [
                        //actual files
                        'dist/js/**/*.js',
                        //now the unit tests
                        'test/**/*.js'
                    ]
                }
            }
        },
        karma: {
            unit: {
                options: {
                    files: ['test/**/*.js']
                }
            }
        },

        jasmine: {
            dev: {
                src: ['dist/js/app.js'],
                options: {
                    specs: 'dist/specs.js',
                    helpers: [],
                    vendor: []
                }
            }
        }
    });

    //**** REGISTERED TASK *****

    //LOCAL BUILD TASKS
    grunt.registerTask('lite', [
        'jshint',
        'less:local',
        'copy:js',
        'copy:html'
    ]);


    //NODE SERVER
    grunt.registerTask('serve', function (target) {
        grunt.task.run([
            'local',
            'connect:local'
        ]);

        if (target !== 'nowatch') {
            return grunt.task.run(['watch']);
        }

    });

    // Unit Tests
    grunt.registerTask('test', ['dev', 'browserify:specs', 'jasmine']);


    grunt.registerTask('dev', [
        'jshint',
        'clean:app',
        'less:app',
        'copy:app',
        'fileblocks:app'
    ]);


    grunt.registerTask('build', [
        'jshint',
        'clean:app',
        'less:app',
        'copy:app',
        'fileblocks:app',
        'cssmin',
        'uglify',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'dev'
    ]);



};
