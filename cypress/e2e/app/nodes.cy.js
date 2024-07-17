describe('nodes', () => {
  it('should display nodes', () => {
    cy.visit('/nodes')

    cy.get('.nodes-table').should('be.visible')
  })
})
