describe('account detail', () => {
  it('should display account detail', () => {
    cy.visit(`/accounts/${Cypress.env('accountAddress')}`)

    cy.get('.account-details-panel').should('be.visible')
    cy.get('.account-activities-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Transactions').click()
    cy.get('.account-transactions-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'AENS Names').click()
    cy.get('.account-names-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Tokens').click()
    cy.get('.account-tokens-panel .paginated-content').should('be.visible')
  })
})
