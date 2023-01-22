require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
    root: true,
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/eslint-config-airbnb'
    ],
    rules: {
        "import/no-extraneous-dependencies": "off",
        "vue/multi-word-component-names": "off"
    }
}