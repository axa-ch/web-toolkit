import handlebars from 'handlebars'

function get(context, property, opts) {
  if (!context || !property) {
    throw new handlebars.Exception('Must pass context and property name to the get helper.')
  }

  if (!context[property]) {
    throw new handlebars.Exception(`Property "${property}" does not exist on context given to the get helper.`)
  }

  return handlebars.helpers.with(context[property], opts)
}

export default get
