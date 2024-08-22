describe('oracle detail', () => {
  it('should display oracle detail', () => {
    cy.visit(`/oracles/${Cypress.env('oracleAddress')}`)

    cy.get('.oracle-details-panel table').should('be.visible')
    cy.get('.oracle-events-panel .paginated-content').should('be.visible')
  })

  it('should display oracles not found page', () => {
    cy.visit('/oracles/wrong', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })
})
