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
    : '<tr class="table__item">\n';

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
    : '<td class="table__item__info"><div class="table__item__info__content" >';

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

module.exports = renderer;
