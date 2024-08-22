describe('name detail', () => {
  it('should display name detail', () => {
    cy.visit(`/names/${Cypress.env('name')}`)

    cy.get('.name-details-panel table').should('be.visible')
    cy.get('.name-pointers-special-panel table ').should('be.visible')
    cy.get('.name-history-panel .paginated-content').should('be.visible')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/names/wrongharp9e8zcu3qadhrey9p',
      { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })
})
