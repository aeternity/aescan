describe('nfts', () => {
  it('should display nfts', () => {
    cy.visit(`${Cypress.env('url')}/nfts`)
    cy.get('.nfts-table').should('be.visible')
  })
})
