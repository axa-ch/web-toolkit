// See `https://github.com/chjj/marked` for possible hooks

var marked = require('marked');
var renderer = new marked.Renderer();

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

renderer._relative = function(link) {
  return this.options.relative ? this.options.relative(link) : link;
}

renderer.heading = function (text, level) {
  var slug = slugify(text);
  var l = parseInt(level) + 1;
  var classes = [];

  if(l == 2) {
    classes = [ "heading", "heading--secondary"]
  }

  return [
    '<h', l, ' class="',classes.join(' '),'" >\n',
      text,
    '</h', l, '>\n'
  ].join('');
};

renderer.image = function (href, title, text) {
  return [
    '<img',
      ' alt="', text, '"',
      ' src="', this._relative(href), '"',
      ' title="', title, '"',
      ' class="image image--responsive" />\n'
  ].join('');
};

renderer.link = function (href, title, text) {
  return [
    '<a',
      ' href="', (href.match(/^https?:\/\//i) == null ? this._relative(href) : href), '"',
      ' class="link"',
      ' title="', title, '">',
      text,
    '</a>\n'
  ].join('');
};

renderer.blockquote = function (quote) {
  return [
    '<blockquote class="blockquote">\n',
      quote,
    '</blockquote>\n'
  ].join('');
};

renderer.table = function (header, body) {
  return [
    '<table class="table table--docs">\n',
      '<thead>\n',
        header,
      '</thead>\n',
      '<tbody class="table__content">\n',
        body,
      '</tbody>\n',
    '</table>\n'
  ].join('');
};

renderer.tablerow = function (content, flags) {
  var openTag = flags.header
    ? '<tr class="table__header">\n'
    : '<tr class="table__row">\n';

  return [
    openTag,
      content,
    '</tr>\n'
  ].join('');
};

renderer.tablecell = function (content, flags) {
  // Attention: We ignore `flags.align`

  var openTag = flags.header
    ? '<th class="table__header__item">'
    : '<td class="table__row__item"><div class="table__row__item__content" >';

  var closeTag = flags.header ? '</th>' : '</div></td>';

  return [
    openTag, '\n',
      content,
    closeTag, '\n'
  ].join('');
};

renderer.paragraph = function (text) {
  return '<p class="paragraph" >'+text+'</p>';
}

renderer.list = function(body, ordered) {
  var type = ordered ? 'ol' : 'ul';

  return '<' + type + ' class="list list--'+ (type == ordered ? 'ordered' : 'unordered') +'">\n' + body + '</' + type + '>\n';
};

renderer.listitem = function(text) {
  return '<li class="list__item" >' + text + '</li>\n';
};

renderer.code = function(code, lang, escaped) {
  if (this.options.highlight) {
    var out = this.options.highlight(code, lang);
    if (out != null && out !== code) {
      escaped = true;
      code = out;
    }
  }

  if (!lang) {
    return '<pre class="highlight"><code class="highlight__listing hljs ">'
      + (escaped ? code : escape(code, true))
      + '\n</code></pre>';
  }

  return '<pre class="highlight"><code class="highlight__listing hljs '
    + this.options.langPrefix
    + escape(lang, true)
    + '">'
    + (escaped ? code : escape(code, true))
    + '\n</code></pre>\n';
};

module.exports = renderer;
/* Copyright AXA Versicherungen AG 2015 */
