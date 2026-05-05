const { defineConfig } = require('cypress')
const fs = require('fs')

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.mysimpleresume.com',
        viewportWidth: 1440,
        viewportHeight: 900,
        setupNodeEvents(on, config) {
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
