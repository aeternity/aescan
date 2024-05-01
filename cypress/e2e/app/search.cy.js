describe('search', () => {
  it('should display search', () => {
    cy.visit(Cypress.env('url'))

    cy.get('.stats-panel').should('be.visible')
      // todo don't rely on stats panel
      .then(() =>
        cy.get('.search-bar__input').type('c{enter}'),
        // todo use click
      )

    cy.get('.search-names-table').should('be.visible')

    cy.contains('.tabs__item', 'Tokens').click()
    cy.get('.search-tokens-table').should('be.visible')

    cy.contains('.tabs__item', 'NFTs').click()
    cy.get('.search-nfts-table').should('be.visible')
    // todo check for length
  })
})
