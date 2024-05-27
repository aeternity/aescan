describe('oracles', () => {
  it('should display oracles', () => {
    cy.visit('/oracles')

    cy.get('.oracles-table').should('be.visible')
  })
})
