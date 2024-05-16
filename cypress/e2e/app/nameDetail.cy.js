describe('name detail', () => {
  it('should display name detail', () => {
    cy.visit(`/names/${Cypress.env('name')}`)

    cy.get('.name-details-panel').should('be.visible')
    cy.get('.name-pointers-special-panel table').should('be.visible')
    cy.get('.name-history-panel table').should('be.visible')
  })
})