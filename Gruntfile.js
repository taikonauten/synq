'use strict';


module.exports = function (grunt){

    // load grunt tasks
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        pkg: require('./package.json'),

        config: {
            src: 'app',
            dest: 'public',
            local: 'http://localhost:5000'
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
                files: ['<%= config.src %>/images/{,*/}*.svg'],
                tasks: ['grunticon']
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
                }]
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

        grunticon: {
            misc: {
                files: [{

                    expand: true,
                    cwd: '<%= config.dest %>/images/svg',
                    src: ['**/*.svg'],
                    dest: '<%= config.dest %>/icons'
                }],
                options: {
                    cssprefix: '.i-',
                    enhanceSVG: true
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
        }
    });

    grunt.registerTask('img', [
        'imagemin',
        'grunticon'
    ]);


    grunt.registerTask('dev', [
        'sass',
        'webpack'
    ]);


    grunt.registerTask('default', [
        'browserSync',
        'watch'
    ]);
};
