describe('microblock details', () => {
  it('should display microblock detail', () => {
    cy.visit(`/microblocks/${Cypress.env('microblockAddress')}`)

    cy.get('.microblock-details-panel').should('be.visible')
    cy.get('.microblock-transactions-panel').should('be.visible')
  })
})
