describe('homepage', () => {
  it('should display homepage', () => {
    cy.visit('/')

    cy.get('.stats-panel').should('be.visible')
    cy.get('.dashboard-state-channels-panel table').should('be.visible')
    cy.get('.dashboard-names-panel table').should('be.visible')

    cy.get('.dashboard-names-panel')
      .contains('Ending Soon')
      .click()
    cy.get('.dashboard-names-panel')
      .should('satisfy', elements => {
        return Array.from(elements[0].querySelectorAll('table, .blank-state')).length > 0
      })

    cy.get('.dashboard-keyblock-panel table').should('be.visible')
    cy.get('.search-bar').should('be.visible')
  })

  it('should display not found page', () => {
    cy.visit('/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Page Not Found')
  })

  it('should display app versions', () => {
    cy.visit('/')
    // improve search for content
    cy.get('.footer__version a').should('be.visible')
  })
})
