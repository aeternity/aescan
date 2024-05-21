describe('token detail', () => {
  it('should display token detail', () => {
    cy.visit(`/tokens/${Cypress.env('tokenAddress')}`)

    cy.get('.token-details-panel table').should('be.visible')
    cy.get('.token-holders-panel table').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.token-events-panel table').should('be.visible')
  })
})
