describe('state channel detail', () => {
  it('should display state channel detail', () => {
    cy.visit(`/state-channels/${Cypress.env('stateChannelAddress')}`)

    cy.get('.state-channel-details-panel table').should('be.visible')
    cy.get('.state-channel-transactions-panel .paginated-content').should('be.visible')
  })

  it('should display state channel not found page', () => {
    cy.visit('/state-channels/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('State Channel Not Found')
  })
})
