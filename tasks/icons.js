module.exports = function() {

    return function (cb) {

        var gulp = require('gulp');
        var iconfont = require('gulp-iconfont');

        var errorify = require('../lib/errorify');
        var after = require('../lib/after');
        var file = require('../lib/file');

        // Notify execution end on second call, when...
        // * icons.json file is written
        // * fonts are created
        var end = after(2, function (err) {
            cb(err);
        }, function (err) {
            if (err) cb(err);
        });

        gulp.src(['./icons/*.svg'])
            .pipe(iconfont({
                fontName: 'style-guide-font',
                appendCodepoints: true
            }))
            .on('error', errorify)
            .on('codepoints', function (points) {
                var glyphs = [];

                points.forEach(function (point) {
                    glyphs.push({
                        name: point.name,
                        codepoint: point.codepoint.toString(16).toUpperCase()
                    });
                });

                var contents = new Buffer(JSON.stringify(glyphs, null, 2));

                file('icons.json', contents)
                    .pipe(gulp.dest('./tmp'))
                    .on('end', end);
            })
            .pipe(gulp.dest('./dist/fonts'))
            .on('end', end);
    };
};