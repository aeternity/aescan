describe('keyblock details', () => {
  it('should display keyblock detail', () => {
    cy.visit(`/keyblocks/${Cypress.env('keyblockId')}`)

    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/keyblocks/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
    // todo status 400 or 500
  })

  // todo what if too much
  // todo test url and height
})
