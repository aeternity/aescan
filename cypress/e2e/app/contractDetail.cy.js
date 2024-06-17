describe('contract detail', () => {
  it('should display contract detail', () => {
    cy.visit(`/contracts/${Cypress.env('contractAddress')}`)

    cy.get('.contract-details-panel').should('be.visible')
    cy.get('.contract-call-transactions-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.contract-events-panel .paginated-content').should('be.visible')

    cy.contains('.tabs__item', 'Verification').click()
    cy.get('.contract-verified-table').should('be.visible')
    cy.get('.code-editor').should('be.visible')
  })
})
