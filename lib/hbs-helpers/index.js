import codeSnippet from './code-snippet'
import eq from './eq'
import frontColor from './front-color'
import generateGuidelinesLink from './generate-guidelines-link'
import get from './get'
import neq from './neq'
import relative from './relative'
import replace from './replace'

export function applyHelpers(handlebars) {
  handlebars.registerHelper('code-snippet', codeSnippet)
  handlebars.registerHelper('eq', eq)
  handlebars.registerHelper('front-color', frontColor)
  handlebars.registerHelper('generateGuidelinesLink', generateGuidelinesLink)
  handlebars.registerHelper('get', get)
  handlebars.registerHelper('neq', neq)
  handlebars.registerHelper('relative', relative)
  handlebars.registerHelper('replace', replace)
  handlebars.registerHelper('json', (context) => { JSON.stringify(context) })
}

export default applyHelpers
