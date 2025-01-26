module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    useminPrepare: {
      html: 'src/index.html',
      options: {
        dest: './dist',
        root: './src'
      }
    },
    clean: ['dist'],
    copy: {
      main: {
        files: [ {
          src: 'src/index.html',
          dest: 'dist/index.html'
        }, {
          expand: true,
          flatten: true,
          src: 'node_modules/@fortawesome/fontawesome-free/webfonts/*',
          dest: 'dist/webfonts'
        // }, {
        //   expand: true,
        //   flatten: true,
        //   src: 'node_modules/materialize-css/font/material-design-icons/**',
        //   dest: 'dist/font/material-design-icons/'
        // }, {
        //   expand: true,
        //   flatten: true,
        //   src: 'node_modules/materialize-css/font/roboto/**',
        //   dest: 'dist/font/roboto/'
        }]
      }
    },
    cssmin: {
      options: {
        banner: '/* Minified CSS File - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      minify: {
        expand: true,
        cwd: 'src/css',
        src: ['*.css'],
        dest: 'dist/css',
        ext: '.min.css'
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/images',
          src: ['*.{png,jpg,jpeg,gif}'],
          dest: 'dist/images'
        }]
      }
    },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.rangeandroam.com',
          port: 21,
          authKey: 'key'
        },
        src: '/Users/richardlucas/p/rangeandroam-website/dist/',
        dest: '/var/www/html/',
      }
    },
    filerev: {
      options: {
        algorithm: 'md5',
        length: 16
      },
      js: {
        src: 'dist/js/main.min.js'
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist']
      }
    },
    gitcommit: {
      task: {
        options: {
          message: grunt.option('m')
        }
      },
      files: {
        src: ''
      }
    }
  });
  
  grunt.registerTask('build', [
    'useminPrepare',
    'concat:generated',
    'cssmin:generated',
    'uglify:generated',
    'filerev',
    'copy',
    'usemin',
    'imagemin'
  ]);

  grunt.registerTask('default', ['build']);
};