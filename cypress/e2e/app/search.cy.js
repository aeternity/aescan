describe('search', () => {
  it('should display search', () => {
    cy.visit('/')

    // loading waiting workaround
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type('c')
    cy.get('.search-bar__submit').click()

    cy.get('.search-names-table').should('be.visible')

    cy.contains('.tabs__item', 'Tokens').click()
    cy.get('.search-tokens-table').should('be.visible')

    cy.contains('.tabs__item', 'NFTs').click()
    cy.get('.search-nfts-table').should('be.visible')
  })
})
