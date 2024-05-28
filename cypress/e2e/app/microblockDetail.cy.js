describe('microblock details', () => {
  it('should display microblock detail', () => {
    cy.visit(`/microblocks/${Cypress.env('microblockAddress')}`)

    cy.get('.microblock-details-panel table').should('be.visible')
    cy.get('.microblock-transactions-panel .paginated-content').should('be.visible')
  })
})
