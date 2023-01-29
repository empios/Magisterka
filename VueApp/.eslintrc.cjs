require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-airbnb',
        '@vue/eslint-config-airbnb-with-typescript'
    ],
    rules: {
        "import/no-extraneous-dependencies": "off",
        "vue/multi-word-component-names": "off",
        "import/prefer-default-export": "off",
        "class-methods-use-this": "off",
        "vuejs-accessibility/click-events-have-key-events": "off",
        "no-underscore-dangle": "off"
    }
}