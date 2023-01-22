module.exports = {
  extends: ['airbnb','airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: "arrow-function",
        unnamedComponents: "arrow-function",
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "react/button-has-type": "off",
    "no-underscore-dangle": "off",
    "react/require-default-props": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off"
  },
};