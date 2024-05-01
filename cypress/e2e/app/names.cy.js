describe('names', () => {
  it('should display names', () => {
    cy.visit(`${Cypress.env('url')}/names`)
    cy.get('.names-chart-panel__container').should('be.visible')
    cy.get('.names-active-panel').should('be.visible')

    cy.contains('.tabs__item', 'In Auction').click()
    cy.get('.names-in-auction-panel').should('be.visible')

    cy.contains('.tabs__item', 'Expired').click()
    cy.get('.names-expired-panel').should('be.visible')
  })
})
