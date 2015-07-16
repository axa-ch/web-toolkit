# See \"https://github.com/chjj/marked\" for possible hooks

marked = require 'marked'
renderer = new marked.Renderer

renderer._slugify = (text) ->
  lower = do text.toLowerCase
  lower.replace /[^\w]+/g, '-'

renderer._relative = (link) ->
  if @options.relative then @options.relative link else link

renderer.heading = (text, level) ->
  slug = @_slugify text
  l = 1 + parseInt level
  classes = []
  classes.push "heading", "heading--secondary" if l == 2
  joinedClasses = classes.join ' '

  [
    "<h#{l} class=\"#{joinedClasses}\">\n"
      "#{text}\n"
    "</h#{l}>\n"
  ].join ""

renderer.image = (href, title, text) ->
  [
    "<img"
      " alt=\"#{text}\""
      " src=\"#{@_relative href}\""
      " title=\"#{title}\""
      " class=\"image image--responsive\" />\n"
  ].join ""

renderer.link = (href, title, text) ->
  isLocal = href.match /^https?:\/\//i == null
  url = if isLocal then @_relative href else href

  [
    "<a"
      " href=\"#{url}\""
      " class=\"link\""
      " title=\"#{title}\">"
      "#{text}"
    "</a>\n"
  ].join ""

renderer.blockquote = (quote) ->
  [
    "<blockquote class=\"blockquote\">\n"
      "#{quote}"
    "</blockquote>\n"
  ].join ""

renderer.table = (header, body) ->
  [
    "<table class=\"table table--docs\">\n"
      "<thead>\n"
        "#{header}"
      "</thead>\n"
      "<tbody class=\"table__content\">\n"
        "#{body}"
      "</tbody>\n"
    "</table>\n"
  ].join ""

renderer.tablerow = (content, flags) ->
  tagType = if flags.header then "header" else "row"

  [
    "<tr class=\"table__#{tagType}\">\n"
      "#{content}"
    "</tr>\n"
  ].join ""

renderer.tablecell = (content, flags) ->
  # Attention: We ignore \"flags.align\"

  if flags.header
    [
      "<th class=\"table__header__item\">"
        "#{content}"
      "</th>"
    ].join ""
  else
    [
      "<td class=\"table__row__item\">"
        "<div class=\"table__row__item__content\">"
          "#{content}"
        "</div>"
      "</td>"
    ].join ""

renderer.paragraph = (text) ->
  "<p class=\"paragraph\">#{text}</p>"

renderer.list = (body, ordered) ->
  type = if ordered then "ol" else "ul"
  cls = if ordered then "ordered" else "unordered"

  [
    "<#{type} class=\"list list--#{cls}\">\n"
      "#{body}"
    "</#{type}>\n"
  ].join ""

renderer.listitem = (text) ->
  [
    "<li class=\"list__item\">"
      "#{text}"
    "</li>\n"
  ].join ""

renderer.code = (code, lang) ->
  if not lang
    [
      "<pre class=\"highlight\">"
        "<code class=\"highlight__listing hljs\">"
          "#{code}\n"
        "</code>"
      "</pre>"
    ].join ""

  if  @options.highlight
    out = @options.highlight code, lang
    if out != null and out != code
      code = out

  [
    "<pre class=\"highlight\">"
      "<code class=\"highlight__listing hljs #{@options.langPrefix}#{lang}\">"
        "#{code}\n"
      "</code>"
    "</pre>\n"
  ].join ""

renderer.codespan = (code) ->
  [
    "<code class=\"code\">"
      "#{code}"
    "</code>\n"
  ].join ""

module.exports = renderer

#! Copyright AXA Versicherungen AG 2015
