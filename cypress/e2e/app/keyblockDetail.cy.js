describe('keyblock details', () => {
  it('should display keyblock detail', () => {
    cy.visit(`/keyblocks/${Cypress.env('keyblockId')}`)

    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })
})
