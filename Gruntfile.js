'use strict';


module.exports = function (grunt){

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    //import libsass-compass
    var compass = require('compass-importer');

    grunt.initConfig({

        pkg: require('./package.json'),

        config: {
            src: 'app',
            dest: 'public',
            local: 'http://localhost:3000'
        },

        watch: {
            sass: {
                files: ['<%= config.src %>/styles/{,*/}*.{scss,sass}'],
                tasks: ['sass']
            },
            scripts: {
                files: ['<%= config.src %>/scripts/{,*/}*.js'],
                tasks: ['webpack']
            },
            images: {
                files: ['<%= config.src %>/images/{,*/}*.{png,jpg,jpeg,gif}'],
                tasks: ['imagemin']
            },
            svgs: {
                files: ['<%= config.src %>/assets/{,*/}*.svg'],
                tasks: ['svgmin']
            }
        },

        webpack: {
            dev: {
                entry: './<%= config.src %>/scripts/main.js',
                output: {
                    path: "<%= config.dest %>/scripts/",
                    filename: "main.js"
                },
                module: {
                    loaders: [
                        { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'}
                    ]
                },
                optimize:{
                    dedupe: true
                }
            }
        },
        sass:{

            dev:{

                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/styles',
                    src: ['{,*/}*.scss'],
                    dest: '<%= config.dest %>/styles',
                    ext: '.css'
                }],
                options: {
                  includePaths: [ '.compass'],
                  importer: compass
                }
            }
        },

        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        '<%= config.dest %>/scripts/*.js',
                        '<%= config.dest %>/styles/*.css'
                    ]
                },
                options: {
                    watchTask: true,
                    proxy: '<%= config.local %>'
                }
            }
        },

        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/images',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= config.dest %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/assets',
                    src: '**/*.svg',
                    dest: '<%= config.dest %>/assets'
                }]
            }
        }
    });

    grunt.registerTask('img', [
        'svgmin',
        'imagemin',
        'grunticon'
    ]);


    grunt.registerTask('dev', [
        'svgmin',
        'sass',
        'webpack'
    ]);


    grunt.registerTask('default', [
        'browserSync',
        'watch'
    ]);
};
