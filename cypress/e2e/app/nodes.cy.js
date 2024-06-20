describe('nodes', () => {
  it('should display nodes', () => {
    cy.visit('/nodes/')

    cy.get('.nodes-tables').should('be.visible')
  })
})
