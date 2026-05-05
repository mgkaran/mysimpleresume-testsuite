// cypress/pages/TemplatePage.js
class TemplatePage {
    visit() {
        cy.visit('https://www.mysimpleresume.com/templates')
    }

    getTemplateCards() {
        return cy.get('button.cursor-pointer')
    }

    selectTemplate(index = 0) {
        this.getTemplateCards().eq(index).click()
    }

    getSelectedTemplateName() {
        return cy.get('p.font-heading')
    }

    clickContinueToEditor() {
        cy.contains('Continue to editor').click()
    }
}

export default TemplatePage
