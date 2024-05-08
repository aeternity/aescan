describe('state channel detail', () => {
  it('should display oracles', () => {
    cy.visit(`/state-channel/${Cypress.env('transactionAddress')}`)
    cy.get('.state-channel-details-panel').should('be.visible')
    cy.get('.state-channel-transactions-panel').should('be.visible')
  })
})
