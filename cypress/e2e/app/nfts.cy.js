describe('nfts', () => {
  it('should display nfts', () => {
    cy.visit('/nfts')

    cy.get('.nfts-table').should('be.visible')
  })
})
