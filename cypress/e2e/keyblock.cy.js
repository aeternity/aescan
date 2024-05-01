describe('keyblock', () => {
  let keyblockId = ''

  it('should get keyblock id', () => {
    cy.visit(Cypress.env('url'))
    cy.get('.stats-panel__value').should('be.visible')
    cy.get('[data-cy=keyblock-height]').invoke('text').then(text => {
      keyblockId = text
    })
  })

  it('should display keyblock detail page', () => {
    cy.visit(`${Cypress.env('url')}/keyblocks/${keyblockId}`)
    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })
})
