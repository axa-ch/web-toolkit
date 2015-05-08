module.exports = function() {

    return function(cb) {

        var gulp = require('gulp');
        var git = require('gulp-git');

        var writeJSONFile = require('../lib/writeJSONFile');
        var after = require('../lib/after');

        var data = {
                tag: null,
                hash: {
                    long: null,
                    short: null
                }
            },
            end = after(2, function(err) {

                writeJSONFile('./tmp/version.json', data);

                cb(err);
            }, function(err) {
                if (err) cb(err);
            });

        git.revParse({args: '--short HEAD'}, function(err, hash) {
            data.hash.short = hash;

            end();
        });

        git.revParse({args: 'HEAD'}, function(err, hash) {
            data.hash.long = hash;

            end();
        });
    }

}