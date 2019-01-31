// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root         : true,
  parserOptions: {
    parser    : 'babel-eslint',
    sourceType: 'module'
  },
  
  env: {
    browser: true
  },
  
  extends: [
    'prettier',
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended'
  ],
  // required to lint *.vue files
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules  : {
    'vue/html-closing-bracket-newline': 0,
    'vue/html-closing-bracket-spacing': 0,
    // allow async-await
    'generator-star-spacing'          : 0,
    // allow debugger during development
    'no-debugger'                     : 2,
    'arrow-parens'                    : 0,
    'spaced-comment'                  : 0,
    'space-before-function-paren'     : 1,
    'key-spacing'                     :
      [
        0,
        {
          singleLine: {
            beforeColon: false,
            afterColon : true
          },
          multiLine : {
            beforeColon: true,
            afterColon : true,
            align      : 'colon'
          }
        }
      ],
    
    'no-multi-spaces':
      [
        'error',
        {
          exceptions: {
            Property            : true,
            VariableDeclarator  : true,
            ImportDeclaration   : true,
            AssignmentExpression: true
          }
        }
      ],
    
    'vue/max-attributes-per-line'                :
      [
        2,
        {
          singleline: 3,
          multiline : {
            max           : 1,
            allowFirstLine: true
          }
        }
      ],
    'vue/singleline-html-element-content-newline': 0
  }
}
