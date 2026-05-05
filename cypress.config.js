const { defineConfig } = require("cypress")

module.exports = defineConfig({
    e2e: {
        baseUrl: "https://www.mysimpleresume.com",
        setupNodeEvents(on, config) {},
    },
})

