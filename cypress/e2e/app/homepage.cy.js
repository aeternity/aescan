describe('homepage', () => {
  it('should display homepage', () => {
    cy.visit('/')

    cy.get('.stats-panel').should('be.visible')
    cy.get('.dashboard-state-channels-panel table').should('be.visible')
    cy.get('.dashboard-auctions-panel table').should('be.visible')
    cy.get('.dashboard-names-panel table').should('be.visible')
    cy.get('.dashboard-keyblock-panel table').should('be.visible')
    cy.get('.search-bar').should('be.visible')
  })
})
