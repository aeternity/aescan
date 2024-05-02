describe('contracts', () => {
  it('should display contracts', () => {
    // todo parametrize per env
    cy.visit(`${Cypress.env('url')}/accounts/ak_gZ55FLJoGEfF5gJ2xJU7j9uSH3fEjoTZq3ygQG8gYA4no6GFW`)

    cy.get('.account-details-panel').should('be.visible')
    cy.get('.account-activities-panel').should('be.visible')

    cy.contains('.tabs__item', 'Transactions').click()
    cy.get('.account-transactions-panel').should('be.visible')

    cy.contains('.tabs__item', 'AENS Names').click()
    cy.get('.account-names-panel').should('be.visible')

    cy.contains('.tabs__item', 'Tokens').click()
    cy.get('.account-tokens-panel').should('be.visible')
    // todo check content
  })
})
