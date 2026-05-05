import TemplatePage from '../pages/TemplatePage'

describe('template page', () => {
    const templatePage = new TemplatePage()

    beforeEach(() => {
        templatePage.visit()
    })

    context('when the page is loaded', () => {
        it('should display the title', () => {
            cy.get('.mb-10 > .font-heading').should('contain', 'Pick a resume design')
        })
    })

    context('Templates Section', () => {
        it('should display 6 templates', () => {
            templatePage.getTemplateCards().should('have.length', 6)
        })

        it('should select the first template and show footer', () => {
            templatePage.selectTemplate(0)
            templatePage.getSelectedTemplateName().should('be.visible')
            cy.contains('Continue to editor').should('be.visible')
        })

        it('should update template name when switching templates', () => {
            templatePage.selectTemplate(0)
            templatePage.getSelectedTemplateName().invoke('text').then((firstName) => {
                templatePage.selectTemplate(1)
                templatePage.getSelectedTemplateName().should('not.have.text', firstName)
            })
        })

        it('should check each template is selectable and shows unique name', () => {
            const templateNames = []
            templatePage.getTemplateCards().each(($btn) => {
                cy.wrap($btn).click()
                templatePage.getSelectedTemplateName().invoke('text').then((name) => {
                    expect(templateNames).not.to.include(name)
                    templateNames.push(name)
                })
            })
        })

        it('should navigate to editor when clicking continue', () => {
            templatePage.selectTemplate(0)
            templatePage.clickContinueToEditor()
            cy.url().should('include', '/')
        } )
    })

    
})
