describe('DEX trades', () => {
  it('should display dex trades', () => {
    cy.visit('/dex-trades')

    cy.get('.dex-trades-table').should('be.visible')
  })
})
