describe('token detail', () => {
  it('should display token detail', () => {
    cy.visit(`/tokens/${Cypress.env('tokenAddress')}`)

    cy.get('.token-details-panel table').should('be.visible')
    cy.get('.token-holders-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.token-events-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Trades').click()
    cy.get('.token-trades-panel .paginated-content').should('be.visible')
  })

  it('should display token not found', () => {
    cy.visit('/tokens/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Token Not Found')
  })
})
