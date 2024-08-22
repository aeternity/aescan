describe('tokens', () => {
  it('should display tokens', () => {
    cy.visit('/tokens')
    cy.get('.tokens-panel').should('be.visible')
  })

  it('should display token not found', () => {
    cy.visit(`/tokens/wrong`, { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })
})
