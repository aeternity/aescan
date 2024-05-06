describe('oracles', () => {
  it('should display oracles', () => {
    cy.visit(`${Cypress.env('url')}/oracles`)
    cy.get('.oracles-table').should('be.visible')
    // todo test navigation
    // todo test filtering
  })
})
