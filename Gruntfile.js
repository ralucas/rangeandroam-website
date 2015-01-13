module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      options: {
        banner: '/* Minified CSS File - <%= grunt.template.today("yyyy-mm-dd") %> */'
      },
      minify: {
        expand: true,
        cwd: '',
        src: 'css/*.css',
        dest: '',
        ext: '.min.css'
      }
    },
    // imagemin: {
    //   dynamic: {
    //     options: {
    //       optimizationLevel: 3
    //     },
    //     files: [{
    //       expand: true,
    //       cwd: 'images/src/',
    //       src: '**/*.png',
    //       dest: 'images/dist/'
    //     }]
    //   }
    // },
    'ftp-deploy': {
      build: {
        auth: {
          host: 'ftp.rangeandroam.com',
          port: 21,
          authKey: 'key'
        },
        src: '/Users/richardlucas/Projects/rangeandroam',
        dest: '/public_html',
        exclusions: ['/Users/richardlucas/Projects/rangeandroam/**/.DS_Store',
          '/Users/richardlucas/Projects/rangeandroam/images/src',
          '/Users/richardlucas/Projects/rangeandroam/css/main.css',
          '/Users/richardlucas/Projects/rangeandroam/Gruntfile.js',
          '/Users/richardlucas/Projects/rangeandroam/node_modules',
          '/Users/richardlucas/Projects/rangeandroam/.ftppass',
          '/Users/richardlucas/Projects/rangeandroam/package.json',
          '/Users/richardlucas/Projects/rangeandroam/README.md',
          '/Users/richardlucas/Projects/rangeandroam/.git']
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
  
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-ftp-deploy');
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('build', ['cssmin']);

  grunt.registerTask('deploy', ['ftp-deploy']);

  grunt.registerTask('default', ['build', 'deploy']);
};