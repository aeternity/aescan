describe('transaction detail', () => {
  it('transaction detail', () => {
    cy.visit(`${Cypress.env('url')}/transactions/th_2Yafj84tsuxskvJnzqGcvthrpDUX8gZE84RXVUwXvkSJxmxbc1`)
    cy.get('.transaction-general-panel').should('be.visible')
    cy.get('.transaction-type-panel').should('be.visible')
    // todo meta and paying for and generalized
  })
})
