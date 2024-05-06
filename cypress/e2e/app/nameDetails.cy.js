describe('name details', () => {
  it('should display name detail', () => {
    cy.visit(`${Cypress.env('url')}/names/fooooooooooo.chain`)

    cy.get('.name-details-panel').should('be.visible')
    cy.get('.name-pointers-special-panel').should('be.visible')
    cy.get('.name-history-panel').should('be.visible')
    // todo chekc in auction and expired
  })
})
