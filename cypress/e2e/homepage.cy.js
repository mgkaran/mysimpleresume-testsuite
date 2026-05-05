describe('home page', () => {
  beforeEach(() => {
    cy.visit('https://www.mysimpleresume.com/')
  })

  context ('when the page is loaded', () => {
    it('should display the title', () => {
      cy.get('.mx-auto > .font-heading').should('contain', 'My Simple Resume')
    })
  })

})