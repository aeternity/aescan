describe('ae coin', () => {
  it('should display ae token detail', () => {
    cy.visit('/tokens/ae')

    cy.get('.ae-coin-panel table__container').should('be.visible')
    cy.get('.ae-coin-transactions-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Markets').click()
    cy.get('.ae-coin-transactions-panel table').should('be.visible')
  })
})
