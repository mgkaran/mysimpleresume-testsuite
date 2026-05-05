Cypress.Commands.add('fillPersonalInfo', () => {
    cy.get('#fullName').type('Test User')
    cy.get('#dateOfBirth').type('1990-01-01')
    cy.get('#jobTitle').type('Test Automation Engineer')
    cy.get('#email').type('test.user@example.com')
    cy.get('#phone').type('123-456-7890')
    cy.get('#location').type('Around the world')
    cy.contains('button', 'Add link').scrollIntoView().click()
    cy.get('#link-title').type('Portfolio')
    cy.get('#link-url').type('https://myportfolio.com')
    cy.get('[role="dialog"]').within(() => {
        cy.contains('button', 'Add').click()
    })
    cy.contains('button', 'Save & Next Step').scrollIntoView().click()
})

Cypress.Commands.add('fillSummary', () => {
    cy.get('[role="switch"]').click()
    cy.get('#summary').type('Experienced QA Automation Engineer with expertise in Cypress and JavaScript.')
    cy.contains('button', 'Save & Next Step').scrollIntoView().click()
})
