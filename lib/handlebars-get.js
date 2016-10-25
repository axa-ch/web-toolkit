import handlebars from 'handlebars'

const get = (context, property, opts) => {
  if (context && context[property]) {
    return handlebars.helpers.with(context[property], opts)
  }
  else {
    if (!context || !property) {
      throw new handlebars.Exception('Must pass context and property name to the get helper.');
    } else if (!context[property]) {
      throw new handlebars.Exception('Property "' + property + '" does not exist on context given to the get helper.');
    }
  }
}

export default get
