describe('contract detail', () => {
  it('should display contract detail', () => {
    cy.visit(`/contracts/${Cypress.env('contractAddress')}`)

    cy.get('.contract-details-panel').should('be.visible')
    cy.get('.contract-call-transactions-panel table').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.contract-events-panel table').should('be.visible')

    cy.contains('.tabs__item', 'Contract').click()
    cy.get('.contract-verified-table').should('be.visible')
    cy.get('.code-editor').should('be.visible')
  })
})
