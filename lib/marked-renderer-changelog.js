import extend from 'extend';
import base from './marked-renderer';

let renderer = {};

renderer.heading = function(text, level) {
  let slug = this._slugify(text);
  let l = 1 + parseInt(level);
  let classes = [];
  if (l === 2) { classes.push("heading", "heading--secondary"); }
  if (l === 3) { classes.push("heading", "heading--tertiary"); }
  if (l === 2) { classes.push("changelog__timeline__item__content__headline"); }
  let joinedClasses = classes.join(' ');

  return [
    `<h${l} id=\"${slug}\" class=\"${joinedClasses}\">\n`,
      `${text}\n`,
    `</h${l}>\n`
  ].join("");
};

renderer.paragraph = text => `<p class=\"paragraph changelog__timeline__item__content__text\">${text}</p>`;

renderer.list = function(body, ordered) {
  let type = ordered ? "ol" : "ul";
  let cls = ordered ? "ordered" : "unordered";

  return [
    `<${type} class=\"list list--${cls} changelog__timeline__item__content__list\">\n`,
      `${body}`,
    `</${type}>\n`
  ].join("");
};

renderer.listitem = text =>
  [
    "<li class=\"list__item changelog__timeline__item__content__list__item\">",
      `${text}`,
    "</li>\n"
  ].join("")
;

export default extend({}, base, renderer);

//! Copyright AXA Versicherungen AG 2015
