describe('nft detail', () => {
  it('should display nft detail', () => {
    cy.visit(`${Cypress.env('url')}/nfts/ct_2UVjVLvt2NycqbfJWywixyYm68iVvkiVS9wubiQRjp9WeQtfpK`)

    cy.get('.nfts-details-panel').should('be.visible')
    cy.get('.nfts-transfers-table').should('be.visible')

    cy.contains('.tabs__item', 'Inventory').click()
    cy.get('.nfts-owners-panel__table').should('be.visible')
    // todo table vs panel
  })
})
