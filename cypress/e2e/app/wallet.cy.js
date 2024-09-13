describe('wallet', () => {
  it('should display wallet login page', () => {
    cy.visit('/wallet')

    cy.get('.wallet-connection-panel__paragraph').should('be.visible')
  })
})
