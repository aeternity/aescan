describe('tokens', () => {
  it('should display tokens', () => {
    cy.visit(`/tokens/${Cypress.env('tokenAddress')}`)
    cy.get('.token-details-panel').should('be.visible')
    cy.get('.token-holders-panel').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.token-events-panel').should('be.visible')
    // todo test see arguments
  })
})
