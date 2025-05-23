describe('ae coin', () => {
  it('should display ae token detail', () => {
    cy.visit('/tokens/ae')

    cy.get('.price-chart-panel__line-chart canvas').should('be.visible')

    cy.get('.ae-coin-panel table').should('be.visible')
    cy.get('.ae-coin-transactions-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Markets').click()
    cy.get('.ae-coin-transactions-panel table').should('be.visible')
  })
})
