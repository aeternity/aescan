describe('tokens', () => {
  it('should display tokens', () => {
    cy.visit(`${Cypress.env('url')}/tokens`)
    cy.get('.tokens-panel').should('be.visible')
    // todo change to table
  })
})
