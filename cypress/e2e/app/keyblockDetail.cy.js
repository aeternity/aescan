describe('keyblock details', () => {
  it('should display keyblock detail', () => {
    cy.visit(`/keyblocks/${Cypress.env('keyblockHeight')}`)
    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })

  it('should display keyblock detail (id access)', () => {
    cy.visit(`/keyblocks/${Cypress.env('keyblockAddress')}`)
    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })

  it('should display keyblock not existent', () => {
    cy.visit(`/keyblocks/${Cypress.env('futureKeyblockHeight')}`)
    cy.get('.keyblock-details-panel__not-existent').should('be.visible')
  })

  it('should display keyblock not found', () => {
    cy.visit('/keyblocks/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Keyblock Not Found')
  })
})
