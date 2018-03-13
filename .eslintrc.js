module.exports = {
  "root": true,

  parserOptions: {
    "sourceType": "module"
  },

  "ecmaFeatures": {
    "globalReturn": true,
    "jsx": true,
    "modules": true
  },

  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },

  "globals": {
    "document": false,
    "escape": false,
    "navigator": false,
    "unescape": false,
    "window": false,
    "describe": true,
    "beforeEach": true,
    "afterEach": true,
    "before": true,
    "it": true,
    "expect": true,
    "sinon": true
  },

  "parser": "babel-eslint",

  "plugins": [
    "react"
  ],

  "extends": "standard",

  "rules": {
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0,
    "react/display-name": 0,
    "react/jsx-boolean-value": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-sort-prop-types": 0,
    "react/jsx-sort-props": 0,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/no-did-mount-set-state": 2,
    "react/no-did-update-set-state": 2,
    "react/no-multi-comp": 2,
    "react/no-unknown-property": 2,
    "react/prop-types": 2,
    "react/react-in-jsx-scope": 2,
    "react/self-closing-comp": 2,
    "react/sort-comp": 0,
    "react/jsx-wrap-multilines": 2,
  }
}
