module.exports = {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "modules": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "parser": "babel-eslint",
  "rules": {
    "comma-dangle": [2, "never"],
    "eol-last": 2,
    "indent": [2, 2, { "SwitchCase": 1 }],
    "jsx-quotes": [2, "prefer-double"],
    "no-multiple-empty-lines": 2,
    "no-unused-vars": 2,
    "no-var": 2,
    "object-curly-spacing": [2, "always"],
    "quotes": [2, "single", "avoid-escape"],
    "react/jsx-handler-names": 2,
    "react/wrap-multilines": 2,
    "semi": [2, "always"],
    "strict": 0,
    "space-before-blocks": [2, "always"],
    "space-before-function-paren": [2, { "anonymous": "always", "named": "never" }],
    "valid-jsdoc": 2
  },
  "plugins": [
    "react"
  ]
};
