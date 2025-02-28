describe('nodes', () => {
  it('should display nodes', () => {
    cy.visit('/nodes')

    cy.get('.nodes-table__container').should('be.visible')
  })
})
