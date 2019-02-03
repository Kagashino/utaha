module.exports = {
  root: true,
  parser: 'babel-eslint',
  // https://github.com/standard/standard/blob/master/docs/RULES-en.md
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'space-before-function-paren': 2,
    'space-infix-ops': 2,
    'no-trailing-spaces': 2,
    'new-parens': 2
  }
}