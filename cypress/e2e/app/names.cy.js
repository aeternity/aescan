describe('names', () => {
  it('should display names', () => {
    cy.visit('/names')

    cy.get('.line-chart').should('be.visible')
    cy.get('.names-active-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'In Auction').click()
    cy.get('.names-in-auction-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Expired').click()
    cy.get('.names-expired-panel .paginated-content').should('be.visible')
  })
})
