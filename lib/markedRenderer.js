// See `https://github.com/chjj/marked` for possible hooks

var marked = require('marked');
var renderer = new marked.Renderer();

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

renderer.heading = function (text, level) {
  var slug = slugify(text);
  var l = parseInt(level) + 1;

  return [
    '<h', l, '>\n',
      text,
      '<a href="#', slug, '" name="', slug, '" class="anchor--docs"></a>\n',
    '</h', l, '>\n'
  ].join('');
};

renderer.image = function (href, title, text) {
  return [
    '<img',
      ' alt="', text, '"',
      ' src="', this.options.relative(href), '"',
      ' title="', title, '"',
      ' class="image image--responsive" />\n'
  ].join('');
};

renderer.link = function (href, title, text) {
  return [
    '<a',
      ' href="', (href.match(/^https?:\/\//i) == null ? this.options.relative(href) : href), '"',
      ' title="', title, '">',
      text,
    '</a>\n'
  ].join('');
};

renderer.blockquote = function (quote) {
  return [
    '<blockquote class="callout">\n',
      quote,
    '</blockquote>\n'
  ].join('');
};

renderer.hr = function () {
  return '<hr class="hr">\n';
};

renderer.table = function (header, body) {
  return [
    '<table class="table">\n',
      '<thead>\n',
        header,
      '</thead>\n',
      '<tbody class="table__content">\n',
        body,
      '</tbody>\n',
    '</table>\n'
  ].join('');
};

renderer.tablerow = function (content) {
  return [
    '<tr class="table__item">\n',
      content,
    '</tr>\n'
  ].join('');
};

renderer.tablecell = function (content, flags) {
  // Attention: We ignore `flags.align`

  var openTag = flags.header
    ? '<th class="table__header__item">'
    : '<td class="table__item__info">';

  var closeTag = flags.header ? '</th>' : '</td>';

  return [
    openTag, '\n',
      content,
    closeTag, '\n'
  ].join('');
};

module.exports = renderer;
