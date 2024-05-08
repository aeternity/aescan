describe('oracle Detail', () => {
  it('should display oracle detail', () => {
    cy.visit(`/oracles/${Cypress.env('oracleAddress')}`)
    cy.get('.oracle-details-panel').should('be.visible')
    cy.get('.oracle-events').should('be.visible')
    // todo test Response available
  })
})
