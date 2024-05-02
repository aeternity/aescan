describe('state channels', () => {
  it('should display oracles', () => {
    cy.visit(`${Cypress.env('url')}/state-channels`)
    cy.get('.state-channels-table').should('be.visible')
  })
})
