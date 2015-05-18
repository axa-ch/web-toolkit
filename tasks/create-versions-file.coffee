module.exports = () ->

    return (cb) ->

        gulp = require 'gulp'
        git = require 'gulp-git'

        writeJSONFile = require '../lib/writeJSONFile'
        after = require '../lib/after'

        data =
            tag: null
            hash:
                long: null
                short: null

        end = after 2, ((err) ->

            writeJSONFile './tmp/version.json', data

            cb err

        ), (err) ->
            if err then cb err

        git.revParse { args: '--short HEAD' } , (err, hash) ->
            data.hash.short = hash

            end()

        git.revParse { args: 'HEAD' } , (err, hash) ->
            data.hash.long = hash

            end()
