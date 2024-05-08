describe('transaction detail', () => {
  it('transaction detail', () => {
    cy.visit(`/transactions/${Cypress.env('transactionAddress')}`)
    cy.get('.transaction-general-panel').should('be.visible')
    cy.get('.transaction-type-panel').should('be.visible')
    // todo meta and paying for and generalized
    // todo testnet and mainnet
    // todo mobile and desktop
  })
})
