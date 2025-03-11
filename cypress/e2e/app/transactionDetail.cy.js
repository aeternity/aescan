describe('transaction detail', () => {
  it('transaction detail', () => {
    cy.visit(`/transactions/${Cypress.env('transactionAddress')}`)

    cy.get('.transaction-general-panel table').should('be.visible')
    cy.get('.transaction-type-panel table').should('be.visible')
    cy.get('.transaction-pointers-panel table').should('be.visible')
  })
  it('transaction detail', () => {
    cy.visit('/transactions/th_2RwgZG3rbjC25bpdBA61Eg4cHG9Qvpc4BtDByfJkogu55u6DMZ')

    cy.get('.transaction-general-panel table').should('be.visible')
    cy.get('.transaction-type-panel table').should('be.visible')
    cy.get('.transaction-pointers-panel table').should('be.visible')
  })

  it('should display transaction not found page', () => {
    cy.visit('/transactions/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Transaction Not Found')
  })
})
