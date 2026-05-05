describe('home page', () => {
  beforeEach(() => {
    cy.visit('https://www.mysimpleresume.com/')
  })

  context ('when the page is loaded', () => {
    it('should display the home title', () => {
      cy.get('.mx-auto > .font-heading').should('contain', 'My Simple Resume')
    })
  })

  context ('Personal Information', () => {
    it('should display Form to fillout details', () => {
      cy.get('h2.font-heading').should('contain', 'Personal information')
    })
    it('should feed data into the form, verify live preview with feeded data and download the resume', () => {
        cy.contains('label', 'Full Name').should('be.visible')
        cy.get('#fullName').type('Test User')

        cy.contains('label', 'Date of birth').should('be.visible')
        cy.get('#dateOfBirth').type('1990-01-01')

        cy.contains('label', 'Job Title').should('be.visible')
        cy.get('#jobTitle').type('Test Automation Engineer')

        cy.contains('label', 'Email').should('be.visible')
        cy.get('#email').type('test.user@example.com')

        cy.contains('label', 'Phone').should('be.visible')
        cy.get('#phone').type('123-456-7890')

        cy.contains('label', 'Location').should('be.visible')
        cy.get('#location').type('Around the world')

        cy.contains('button', 'Add link').scrollIntoView().click()
        cy.get('#link-title').type('Portfolio')
        cy.get('#link-url').type('https://myportfolio.com')
        cy.get('[role="dialog"]').within(() => {
            cy.contains('button', 'Add').should('not.be.disabled').click()
        })

        // Verify live preview shows correct data
        cy.get('header[data-resume-block="true"]').within(() => {
            cy.get('h1').should('contain', 'Test User')
            cy.get('p').eq(0).should('contain', 'Test Automation Engineer')
            cy.get('p').eq(1).should('contain', 'test.user@example.com')
            cy.get('p').eq(1).should('contain', 'Around the world')
            cy.get('p').eq(2).should('contain', 'https://myportfolio.com')
        })
        cy.contains('button', 'Save & Next Step').should('be.visible').click()
        cy.contains('h2.font-heading', 'Professional summary').should('be.visible') 
        
        //Summary Step
        cy.contains('h2.font-heading', 'Professional summary').should('be.visible')
        //verify the switch is off by default
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'false')
        //Turn on the switch
        cy.get('[role="switch"]').click()
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'true')
        // fill summary textarea
        cy.get('#summary').type('Experienced Test Automation Engineer with a passion for creating robust and efficient test frameworks. Skilled in JavaScript, Cypress, and Selenium. Proven track record of improving test coverage and reducing manual testing efforts.')
        // Verify summary appears in live preview
        cy.get('p').eq(5).should('contain', 'Experienced Test Automation Engineer')

        cy.contains('button', 'Save & Next Step').scrollIntoView().click()

        //Work Experience Step
        cy.contains('h2.font-heading', 'Work experience').should('be.visible')
        cy.contains('button', 'Add Experience').scrollIntoView().click()
        //fill experience form
        cy.get('[name="experience.0.jobTitle"]').type('Test Automation Engineer')
        cy.get('[name="experience.0.company"]').type('Tech Company')
        cy.get('[name="experience.0.location"]').type('Deutschland')
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'false')
        //Turn on the switch for currently working
        cy.get('[role="switch"]').click()
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'true')
        cy.get('[name="experience.0.description"]').type('Developed and maintained automated test scripts using Cypress and Selenium. Collaborated with cross-functional teams to identify test requirements and improve overall software quality.  Implemented CI/CD pipelines to integrate automated tests into the development workflow, resulting in faster feedback and reduced manual testing efforts. Mentored junior team members and conducted code reviews to ensure best practices in test automation.')
        cy.contains('button', 'Done editing').scrollIntoView().click()
        // Verify experience appears in live preview
        cy.get('h3').should('contain', 'Test Automation Engineer')
        cy.contains('button', 'Save & Next Step').scrollIntoView().click()

        //Education Step
        cy.contains('h2.font-heading', 'Education').should('be.visible')
        cy.contains('button', 'Add Education').scrollIntoView().click()
        //fill education form
        cy.get('[name="education.0.degree"]').type('Bachelor of Science in Computer Science')
        cy.get('[name="education.0.school"]').type('University of Technology')
        cy.get('[name="education.0.location"]').type('Deutschland')
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'false')
        //Turn on the switch for currently working
        cy.get('[role="switch"]').click()
        cy.get('[role="switch"]').should('have.attr', 'aria-checked', 'true')
        cy.get('[name="education.0.gpa"]').type('1.5 GPA')
        cy.contains('button', 'Done editing').scrollIntoView().click()
        // Verify education appears in live preview
        cy.get('h3').should('contain', 'Bachelor of Science in Computer Science')
        cy.contains('button', 'Save & Next Step').scrollIntoView().click()

        //Skills Step
        cy.contains('h2.font-heading', 'Skills & extras').should('be.visible')
        cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.0.name"]').type('Test Automation')
                cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.1.name"]').type('JavaScript')
                cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.2.name"]').type('Cypress')
                cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.3.name"]').type('Selenium')
                cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.4.name"]').type('CI/CD')
                cy.contains('button', 'Add Skill').scrollIntoView().click()
        cy.get('[name="skills.5.name"]').type('Test Frameworks')
        // Verify skills appear in live preview
        cy.get('p').eq(8).should('contain', 'Test Automation, JavaScript, Cypress, Selenium, CI/CD, Test Frameworks')

        //Add Projects
        cy.contains('button', 'Add Project').scrollIntoView().click()
        cy.get('[name="projects.0.name"]').type('Test Automation Framework')
        cy.get('[name="projects.0.url"]').type('https://github.com/test-automation-framework')
        cy.get('[name="projects.0.description"]').type('Designed and implemented a robust test automation framework using Cypress, resulting in a 30% increase in test coverage and a 25% reduction in manual testing efforts.')
        cy.contains('button', 'Done editing').scrollIntoView().click()
        // Verify project appears in live preview
        cy.get('h3').should('contain', 'Test Automation Framework')

        //Add Custom Section
        cy.contains('button', 'Add Custom Section').scrollIntoView().click()
        cy.get('[name="customSections.0.title"]').type('Certifications')
        cy.contains('button', 'Add Paragraph').scrollIntoView().click()

        cy.get('[name="customSections.0.items.0.name"]').type('Certified Test Automation Engineer (CTAE) - 2022')
        cy.contains('button', 'Done editing').scrollIntoView().click()
        // Verify custom section appears in live preview
        cy.get('h3').eq(6).should('contain', 'Certified Test Automation Engineer (CTAE) - 2022')

        cy.contains('button', 'Review & Finalize').scrollIntoView().click()

        // Verify download page loaded
        cy.contains('Ready to download?').should('be.visible')
        cy.contains('button', 'Back to Edit').should('be.visible')
        cy.contains('button', 'Download PDF').should('be.visible')
        // Verify templates are visible with user data
        cy.get('h1').should('contain', 'Test User')
        cy.get('button.cursor-pointer').should('have.length', 6)

        // Test Back to Edit navigation
        cy.contains('button', 'Back to Edit').click()
        cy.contains('h2.font-heading', 'Skills & extras').scrollIntoView().should('be.visible')

        // Navigate back to download page
        cy.contains('button', 'Review & Finalize').scrollIntoView().click()

        // Test Download PDF functionality
        cy.contains('button', 'Download PDF').click()
        cy.readFile('cypress/downloads/Test_User_Resume.pdf', { timeout: 15000 }).should('exist')

    })
    

  })



  

})