describe('transactions', () => {
  it('should display transactions', () => {
    cy.visit('/transactions')
    cy.get('.transactions-table').should('be.visible')
    cy.get('.line-chart').should('be.visible')
    cy.get('.transaction-statistics__panel').should('be.visible')
  })
})
