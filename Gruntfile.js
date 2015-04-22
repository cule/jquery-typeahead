module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/*!\n' +
            ' * jQuery Typeahead\n' +
            ' * Copyright (C) 2015 RunningCoder.org\n' +
            ' * Licensed under the MIT license\n' +
            ' *\n' +
            ' * @author <%= pkg.author.name %>\n' +
            ' * @version <%= pkg.version %> (<%= grunt.template.today("yyyy-mm-dd") %>)\n' +
            ' * @link http://www.runningcoder.org/jquerytypeahead/\n' +
            '*/\n',

        clean: {
            dist: ["dist"]
        },

        copy: {
            dist: {
                files: [
                    {
                        src: ['src/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.js'
                    },
                    {
                        src: ['src/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.min.js'
                    }
                ]
            }
        },

        comments: {
            dist: {
                options: {
                    singleline: true,
                    multiline: true
                },
                src: [ 'dist/*.js']
            }
        },

        replace: {
            banner: {
                options: {
                    patterns: [
                        {
                            match: /\/\*![\S\s]+?\*\/[\r\n]*/,
                            replacement: '<%= banner %>'
                        }
                    ]
                },
                files: [
                    {
                        src: ['src/jquery.typeahead.js'],
                        dest: 'src/jquery.typeahead.js'
                    }
                ]
            },
            removeDebug: {
                options: {
                    patterns: [
                        {
                            match: /\s?\{debug\}[\s\S]*?\{\/debug\}/g,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/jquery.typeahead.min.js'],
                        dest: 'dist/jquery.typeahead.min.js'
                    }
                ]
            },
            removeComments: {
                options: {
                    patterns: [
                        {
                            match: /\/\*[^!][\S\s]+?\*\/[\r\n]?/gm,
                            replacement: ''
                        }
                    ]
                },
                files: [
                    {
                        src: ['dist/jquery.typeahead.js'],
                        dest: 'dist/jquery.typeahead.js'
                    }
                ]
            }
        },

        uglify: {
            dist: {
                options: {
                    mangle: true,
                    compress: true,
                    banner: '<%= banner %>'
                },
                files: {
                    'dist/jquery.typeahead.min.js': ['dist/jquery.typeahead.min.js']
                }
            }

        }

    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-stripcomments');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', [
        'clean:dist',
        'replace:banner',
        'copy:dist',
        'comments',
        'replace:removeComments',
        'replace:removeDebug',
        'uglify'
    ]);

};
