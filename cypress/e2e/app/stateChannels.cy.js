describe('state channels', () => {
  it('should display oracles', () => {
    cy.visit('/state-channels')

    cy.get('.state-channels-table').should('be.visible')
  })
})
