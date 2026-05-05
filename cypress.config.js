const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
        reportDir: 'cypress/reports',
        overwrite: false,
        html: true,
        json: false,
        embeddedScreenshots: true,
        inlineAssets: true,
    },
    e2e: {
        baseUrl: 'https://www.mysimpleresume.com',
        viewportWidth: 1440,
        viewportHeight: 900,
        video: true,
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on)
            on('task', {
                deleteFile(filePath) {
                    if (fs.existsSync(filePath)) {
                        fs.unlinkSync(filePath)
                    }
                    return null
                }
            })
        },
    },
})
