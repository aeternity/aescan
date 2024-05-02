describe('contract detail', () => {
  it('should display contract detail', () => {
    cy.visit(`${Cypress.env('url')}/contracts/ct_s5ZB6cGCqS5QbUboQBK8CWwpknKRSajrt8b1EQRp4t4R5D47e`)

    cy.get('.contract-details-panel').should('be.visible')
    cy.get('.contract-call-transactions-panel').should('be.visible')

    cy.contains('.tabs__item', 'Events').click()
    cy.get('.contract-events-panel').should('be.visible')

    cy.contains('.tabs__item', 'Contract').click()
    cy.get('.contract-verified-table-condensed__table').should('be.visible')
    cy.get('.contract-verified-panel__code-editor').should('be.visible')
  })
})
