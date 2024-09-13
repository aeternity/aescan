describe('keyblocks', () => {
  it('should display keyblocks', () => {
    cy.visit('/keyblocks')

    cy.get('.keyblocks-table').should('be.visible')
  })
})
