describe('name detail', () => {
  it('should display name detail', () => {
    cy.visit(`/names/${Cypress.env('chainName')}`)

    cy.get('.name-details-panel table').should('be.visible')
    cy.get('.name-pointers-special-panel table').should('be.visible')
    cy.get('.name-pointers-custom-panel table').should('be.visible')
    cy.get('.name-history-panel .paginated-content').should('be.visible')
  })

  it('should display name detail accessed by name hash', () => {
    cy.visit(`/names/${Cypress.env('nameAddress')}`)

    cy.get('.name-details-panel table').should('be.visible')
    cy.get('.name-pointers-special-panel table').should('be.visible')
    cy.get('.name-pointers-custom-panel table').should('be.visible')
    cy.get('.name-history-panel .paginated-content').should('be.visible')
  })

  it('should display name does not exist page', () => {
    cy.visit('/names/wrong-harp9e8zcu3qadhrey9p',
      { failOnStatusCode: false })
    cy.get('.title').contains('Name Not Found')
  })
})
