extend = require 'extend'
base = require './marked-renderer'

renderer = {}

renderer.heading = (text, level) ->
  slug = @_slugify text
  l = 1 + parseInt level
  classes = []
  classes.push "heading", "heading--secondary" if l == 2
  classes.push "heading", "heading--tertiary" if l == 3
  classes.push "changelog__timeline__item__content__headline" if l == 2
  joinedClasses = classes.join ' '

  [
    "<h#{l} id=\"#{slug}\" class=\"#{joinedClasses}\">\n"
      "#{text}\n"
    "</h#{l}>\n"
  ].join ""

renderer.paragraph = (text) ->
  "<p class=\"paragraph changelog__timeline__item__content__text\">#{text}</p>"

renderer.list = (body, ordered) ->
  type = if ordered then "ol" else "ul"
  cls = if ordered then "ordered" else "unordered"

  [
    "<#{type} class=\"list list--#{cls} changelog__timeline__item__content__list\">\n"
      "#{body}"
    "</#{type}>\n"
  ].join ""

renderer.listitem = (text) ->
  [
    "<li class=\"list__item changelog__timeline__item__content__list__item\">"
      "#{text}"
    "</li>\n"
  ].join ""

module.exports = extend {}, base, renderer

#! Copyright AXA Versicherungen AG 2015
