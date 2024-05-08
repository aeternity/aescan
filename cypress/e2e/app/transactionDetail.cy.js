describe('transaction detail', () => {
  it('transaction detail', () => {
    cy.visit(`/transactions/${Cypress.env('transactionAddress')}`)
    cy.get('.transaction-general-panel table').should('be.visible')
    cy.get('.transaction-type-panel table').should('be.visible')
  })
})
