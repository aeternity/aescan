describe('names', () => {
  it('should display names', () => {
    cy.visit('/names')
    cy.get('.names-chart-panel__container').should('be.visible')
    cy.get('.names-active-table').should('be.visible')

    cy.contains('.tabs__item', 'In Auction').click()
    cy.get('.names-in-auction-table').should('be.visible')

    cy.contains('.tabs__item', 'Expired').click()
    cy.get('.names-expired-table').should('be.visible')
  })
})
