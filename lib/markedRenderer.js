var marked = require('marked');
var renderer = new marked.Renderer();

function slugify(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

renderer.heading = function (text, level) {
  var slug = slugify(text);
  var l = parseInt(level) + 1;

  return [
    '<h', l, '>',
      text,
      '<a href="#', slug, '" name="', slug, '" class="anchor--docs"></a>',
    '</h', l, '>'
  ].join('');
};

// See `https://github.com/chjj/marked` for possible hooks

module.exports = renderer;
