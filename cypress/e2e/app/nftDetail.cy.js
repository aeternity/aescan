describe('nft detail', () => {
  it('should display nft detail', () => {
    cy.visit(`/nfts/${Cypress.env('nftAddress')}`)

    cy.get('.nft-details-panel table').should('be.visible')
    cy.get('.nft-transfers-table').should('be.visible')

    cy.contains('.tabs__item', 'Inventory').click()
    cy.get('.nft-owners-panel__table').should('be.visible')
  })

  it('should display nfts not found', () => {
    cy.visit('/nfts/wrong', { failOnStatusCode: false })
    cy.get('.title').contains('NFT Not Found')
  })
})
