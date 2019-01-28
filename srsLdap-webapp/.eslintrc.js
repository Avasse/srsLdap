module.exports = {
  root         : true,
  env          : {
    node: true
  },
  extends      : ["plugin:vue/essential", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules        : {
    "no-console"                      : "off",
    "no-debugger"                     : "off",
    "vue/html-closing-bracket-newline": 0,
    "vue/html-closing-bracket-spacing": 0,
    "generator-star-spacing"          : 0,
    "arrow-parens"                    : 0,
    "spaced-comment"                  : 0,
    "space-before-function-paren"     : ["error", "never"],
    "key-spacing"                     : [
      0,
      {
        singleLine: {
          beforeColon: false,
          afterColon : true
        },
        multiLine : {
          beforeColon: true,
          afterColon : true,
          align      : "colon"
        }
      }
    ],
    
    "no-multi-spaces": [
      "error",
      {
        exceptions: {
          Property            : true,
          VariableDeclarator  : true,
          ImportDeclaration   : true,
          AssignmentExpression: true
        }
      }
    ],
    
    "vue/max-attributes-per-line": [
      2,
      {
        singleline: 3,
        multiline : {
          max           : 1,
          allowFirstLine: true
        }
      }
    ]
  }
};
