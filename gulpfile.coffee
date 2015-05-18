require 'gulp-coffee/node_modules/coffee-script/register'

gulp = require('gulp')
del = require('del')
runSequence = require('run-sequence')
connect = require('connect')
serveStatic = require('serve-static')
pseudoelements = require('postcss-pseudoelements')
autoprefixer = require('autoprefixer-core')
csswring = require('csswring')
npm = require('npm')
$ = require('gulp-load-plugins')()
readJSONFile = require('./lib/readJSONFile')
errorify = require('./lib/errorify')
file = require('./lib/file')
after = require('./lib/after')
config = require('./package.json')

##################################
# CLEAN
##################################
gulp.task 'clean', (cb) ->
  del [ './dist/**/*' ], cb
  return

##################################
# DOCS
##################################
gulp.task 'docs', require('./tasks/docs') {
  cwd: __dirname
  src: './docs'
  dest: './dist/docs'
}

##################################
# ICONS
##################################
gulp.task 'icons', require('./tasks/icons')()

gulp.task 'icons-svg', ->
  gulp.src 'icons/*.svg'
    .pipe $.svgmin()
    .pipe $.svgstore()
    .pipe gulp.dest './dist/images/'

##################################
# IMAGES
##################################
gulp.task 'images', ->
  gulp.src [ './images/**' ], { base: './images' }
    .pipe gulp.dest './dist/images'

##################################
# STYLES
##################################
gulp.task 'styles-clean', (cb) ->
  del [ './dist/{less,css}/**' ], cb

gulp.task 'styles-copy', ->
  gulp.src [ './less/**/*.less' ], base: './less'
    .pipe gulp.dest './dist/less'

gulp.task 'styles-icons', (cb) ->
  gulp.src [ './icons/*.svg' ]
    .pipe $.iconfont({ fontName: 'temporary' })
    .on 'error', errorify
    .on 'codepoints', (codepoints) ->
      gulp.src './less/style/blocks/icon.less.lodash', { base: './less' }
        .pipe $.template({ glyphs: codepoints })
        .on 'error', errorify
        .pipe $.rename('style/blocks/icon.less')
        .pipe gulp.dest './dist/less'
        .on 'end', ->
          cb()
  return;

gulp.task 'styles-generate', ->
  gulp.src [
    './less/**/*.less.lodash'
    '!./less/style/blocks/icon.less.lodash'
  ]
    .pipe $.template { colors: readJSONFile('./less/colors.json') }
    .pipe $.rename { extname: '' }
    .pipe gulp.dest './dist/less/'

gulp.task 'styles-compile', ->
  gulp.src [ './dist/less/{style,normalize}.less' ]
    .pipe $.sourcemaps.init()
    .pipe $.less { paths: [ './dist/less' ] }
    .on 'error', errorify
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'

gulp.task 'styles-postcss', ->
  gulp.src [ './dist/css/*.css' ]
    .pipe $.sourcemaps.init { loadMaps: true }
    .pipe $.postcss [
      autoprefixer()
      pseudoelements()
    ]
    .on 'error', errorify
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'
    .pipe $.filter [
      '*'
      '!**/*.map'
    ]
    .pipe $.postcss [ csswring() ]
    .pipe $.rename { extname: '.min.css' }
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/css'

gulp.task 'styles', (cb) ->
  runSequence 'styles-clean', 'styles-copy', 'styles-icons', 'styles-generate', 'styles-compile', 'styles-postcss', cb

##################################
# JQUERY
##################################
gulp.task 'jquery-clean', (cb) ->
  del [ './dist/jquery/**' ], cb

gulp.task 'jquery-compile', ->
  gulp.src [ './jquery/**/*.coffee' ]
    .pipe $.coffeelint()
    .pipe $.coffeelint.reporter 'default'
    .pipe $.sourcemaps.init()
    .pipe $.coffee()
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .on 'error', errorify
    .pipe gulp.dest './dist/jquery'
    .pipe $.filter [
      '*'
      '!**/*.map'
    ]
    .pipe $.concat 'axa-wsg.jquery.all.js'
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

gulp.task 'jquery-compress', ->
  gulp.src [ './dist/jquery/*.js' ]
    .pipe $.sourcemaps.init { loadMaps: true }
    .pipe $.uglify()
    .on 'error', errorify
    .pipe $.rename { extname: '.min.js' }
    .pipe $.sourcemaps.write('.', sourceRoot: './')
    .pipe gulp.dest './dist/jquery'

gulp.task 'jquery', (cb) ->
  runSequence 'jquery-clean', 'jquery-compile', 'jquery-compress', cb

##################################
# NG
##################################
gulp.task 'ng-clean', (cb) ->
  del [ './dist/ng/**' ], cb

gulp.task 'ng-copy', ->
  gulp.src [ './ng/**/*' ]
    .pipe gulp.dest './dist/ng'

gulp.task 'ng-scripts', ->
  gulp.src [ './dist/ng/**/*.js' ]
  .pipe $.jshint()
  .pipe $.jshint.reporter { 'jshint-stylish' }
  .pipe $.sourcemaps.init { loadMaps: true }
  .pipe $.ngAnnotate()
  .pipe $.uglify()
  .pipe $.rename { extname: '.min.js' }
  .pipe $.sourcemaps.write('.', sourceRoot: './')
  .pipe gulp.dest './dist/ng'

gulp.task 'ng', (cb) ->
  runSequence 'ng-clean', 'ng-copy', 'ng-scripts', cb

##################################
# CREATE VERSIONS FILE
##################################
gulp.task 'create-versions-file', require('./tasks/create-versions-file')()

##################################
# RELEASE
##################################
gulp.task 'release-dist-generate-bower-json', ->
  gulp.src [ './package.json' ]
  .pipe $.generateBowerJson()
  .pipe gulp.dest './dist'

gulp.task 'release-dist', [ 'release-dist-generate-bower-json' ], ->
  packageJson = readJSONFile './package.json'

  gulp.src [
    './dist/**'
    './README.*'
    'LICENSE.*'
    '!./dist/docs/downloads/**/*'
  ]
  .pipe $.tar './axa-web-style-guide-dist-' + packageJson.version + '.tar'
  .pipe $.gzip()
  .pipe gulp.dest './dist/docs/downloads/'

gulp.task 'release-npm-pack', (cb) ->
  npm.load {}, ->
    npm.commands.pack [ './' ], cb

gulp.task 'release-npm-copy', [ 'release-npm-pack' ], ->
  gulp.src [ './axa-web-style-guide-*.tgz' ]
    .pipe gulp.dest './dist/docs/downloads/'

gulp.task 'release-npm', [ 'release-npm-copy' ], ->
  del [ 'axa-web-style-guide-*.tgz' ]

gulp.task 'release', (cb) ->
  runSequence 'release-npm', 'release-dist', cb

##################################
# BUILD
##################################
gulp.task 'build', (cb) ->
  runSequence(
    'icons',
    'icons-svg',
    'images',
    'styles',
    'jquery',
    'create-versions-file',
    'docs',
    cb
  )

##################################
# SERVE
##################################
gulp.task 'serve', (next) ->
  connect().use(serveStatic('./dist/docs')).listen process.env.PORT or 3000, next

##################################
# DEV
##################################
gulp.task 'dev', [
  'build'
  'serve'
], ->

  $.livereload.listen()

  $.watch [
    './docs/**'
    './less/**'
    './icons/**'
    './images/**'
    './jquery/**'
    './ng/**'
  ], (files, callback) ->
    runSequence 'build', (args) ->
      $.livereload.changed()
      callback.apply this, args

##################################
# DEPLOY
##################################
gulp.task 'deploy-clean', (cb) ->
  del [ './out' ], cb

gulp.task 'deploy-copy', ->
  gulp.src [ './dist/docs/**' ]
    .pipe gulp.dest './out'

gulp.task 'deploy-init', (cb) ->
  git.init {
    args: '--quiet'
    cwd: './out'
  }, cb

gulp.task 'deploy-config', (cb) ->
  git.addRemote(
    'deploy',
    if process.env.REPO_URL then process.env.REPO_URL else config.repository.url,
    { cwd: './out' },
    cb
  )

gulp.task 'deploy-add', ->
  gulp.src [ './*' ], cwd: './out'
    .pipe git.add { cwd: './out' }

gulp.task 'deploy-commit', ->
  gulp.src [ './*' ], cwd: './out'
    .pipe git.commit(
      'Deploy to GitHub Pages',
      args: '--author="Robo Coder <robo@coder>"'
      cwd: './out'
    )

gulp.task 'deploy-push', (cb) ->
  git.push('deploy', 'master:gh-pages', {
    args: '--force'
    cwd: './out'
  }, cb).end()

gulp.task 'deploy', (cb) ->
  runSequence(
    'release',
    'deploy-clean',
    'deploy-copy',
    'deploy-init',
    'deploy-config',
    'deploy-add',
    'deploy-commit',
    'deploy-push',
    cb
  )

##################################
# DEFAULT
##################################
gulp.task 'default', [ 'build' ]

# Copyright AXA Versicherungen AG 2015
