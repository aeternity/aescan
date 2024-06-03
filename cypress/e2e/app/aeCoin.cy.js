describe('ae coin', () => {
  it('should display tokens', () => {
    cy.visit('/tokens/ae')

    cy.get('.ae-coin-panel table').should('be.visible')
    cy.get('.ae-coin-transactions-panel .paginated-content').should('be.visible')
  })
})
