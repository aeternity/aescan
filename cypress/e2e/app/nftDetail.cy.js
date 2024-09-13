describe('nft detail', () => {
  it('should display nft detail', () => {
    cy.visit(`/nfts/${Cypress.env('nftAddress')}`)

    cy.get('.nfts-details-panel table').should('be.visible')
    cy.get('.nfts-transfers-table').should('be.visible')

    cy.contains('.tabs__item', 'Inventory').click()
    cy.get('.nfts-owners-panel__table').should('be.visible')
  })

  it('should display nfts not found', () => {
    cy.visit('/nfts/wrong', { failOnStatusCode: false })
    cy.get('.title').contains('NFT Not Found')
  })
})
