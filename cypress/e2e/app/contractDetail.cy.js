describe('contract detail', () => {
  it('should display contract detail', () => {
    cy.visit(`/contracts/${Cypress.env('contractAddress')}`)

    cy.get('.contract-details-panel').should('be.visible')
    cy.get('.contract-call-transactions-panel').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.contract-events-panel').should('be.visible')

    cy.contains('.tabs__item', 'Contract').click()
    cy.get('.contract-verified-table-condensed__table').should('be.visible')
    cy.get('.contract-verified-panel__code-editor').should('be.visible')
  })
})
