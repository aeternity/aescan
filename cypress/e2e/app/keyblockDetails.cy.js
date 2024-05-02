describe('microblock details', () => {
  it('should display microblock detail', () => {
    cy.visit(`${Cypress.env('url')}/microblocks/mh_27HKqcut9U9xDwEAf3Lz6evTxY4rfy7odKeSnQaqu45iQesjyj`)

    cy.get('.microblock-details-panel').should('be.visible')
    cy.get('.microblock-transactions-panel').should('be.visible')
  })
})
