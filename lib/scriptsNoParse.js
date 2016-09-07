import resolve from 'browser-resolve'

const cwd = process.cwd()
const modules = {
  'react': cwd + '/node_modules/react/dist/react.js',
  'react-dom': cwd + '/node_modules/react-dom/dist/react-dom.js',
}

export default [
  'jquery',
  // 'react',
  // 'react-dom',
  'baconjs',
  'moment',
  'classnames',
  // 'svg4everybody',
  'zeroclipboard',
  'iframe-resizer',
  'lunr',
  'slick-carousel',
].map((module) => resolve.sync(module, { modules }))
