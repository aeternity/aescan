describe('ae coin', () => {
  it('should display tokens', () => {
    cy.visit('/tokens/ae')

    cy.get('.ae-coin-panel table').should('be.visible')
  })
})
