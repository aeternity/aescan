describe('state channel detail', () => {
  it('should display state channel detail', () => {
    cy.visit(`/state-channels/${Cypress.env('stateChannelAddress')}`)

    cy.get('.state-channel-details-panel table').should('be.visible')
    cy.get('.state-channel-transactions-panel table').should('be.visible')
  })
})
