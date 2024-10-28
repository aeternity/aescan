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

  it('should get different results when filtering transactions', () => {
    cy.visit(`/accounts/${Cypress.env('accountAddress')}`)
    cy.contains('.tabs__item', 'Transactions').click()
    cy.get('.account-transactions-table tbody td').should('be.visible')
    cy.get('.account-transactions-panel .multiselect').click()
    cy.contains('.multiselect__option', 'ContractCallTx').click()
    cy.get('.blank-state').should('be.visible')
  })


  it('should display generalized account label', () => {
    cy.visit(`/accounts/${Cypress.env('generalizedAccountAddress')}`)
    cy.get('.account-details-panel .chip').should('contain', 'Generalized')
  })

  it('should select previous tab when navigating back', () => {
    cy.visit(`/accounts/${Cypress.env('accountAddress')}`)
    cy.contains('.tabs__item', 'Transactions').click()
    cy.go(-1)
    cy.get('.tabs__item--active').should('contain', 'Activities')
  })
})
