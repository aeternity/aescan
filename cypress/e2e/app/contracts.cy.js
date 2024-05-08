describe('contracts', () => {
  it('should display contracts', () => {
    cy.visit('/contracts')
    cy.get('.contracts-table').should('be.visible')
    cy.get('.line-chart').should('be.visible')
  })
})
