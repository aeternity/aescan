describe('homepage', () => {
  it('should display homepage', () => {
    cy.visit(Cypress.env('url'))
    cy.get('.stats-panel').should('be.visible')
    cy.get('.dashboard-state-channels-panel').should('be.visible')
    cy.get('.dashboard-auctions-panel').should('be.visible')
    cy.get('.dashboard-names-panel').should('be.visible')
    cy.get('.dashboard-keyblock-panel').should('be.visible')
  })
})
