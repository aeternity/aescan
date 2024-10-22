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

  it('should display account not found page', () => {
    cy.visit(`/accounts/${Cypress.env('notFoundAccount')}`,
      { failOnStatusCode: false })
    cy.get('.title').contains('Account Not Found')
  })

  it('should display account is existent', () => {
    cy.visit(`/accounts/${Cypress.env('existentAccount')}`,
      { failOnStatusCode: false })
    cy.get('.account-details-panel .copy-chip').should('be.visible')
  })

  it('should display account is existent and has tokens', () => {
    cy.visit(`/accounts/${Cypress.env('existentAccount')}`,
      { failOnStatusCode: false })
    cy.get('.account-details-panel .copy-chip').should('be.visible')
    cy.get('.account-tokens-panel').should('be.visible')
  })
})
