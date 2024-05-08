describe('contracts', () => {
  it('should display contracts', () => {
    cy.visit('/contracts')
    cy.get('.contracts-table').should('be.visible')
    cy.get('.contracts-chart-panel__container').should('be.visible')
  })
})
