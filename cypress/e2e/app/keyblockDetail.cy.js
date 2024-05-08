describe('keyblock details', () => {
  let keyblockId = ''

  it('should get keyblock id', () => {
    cy.visit('/')
    cy.get('.stats-panel__value').should('be.visible')
    // todo no need hook
    cy.get('[data-cy=keyblock-height]').invoke('text').then(text => {
      keyblockId = text
    })
  })

  it('should display keyblock detail', () => {
    cy.visit(`/keyblocks/${keyblockId}`)
    cy.get('.keyblock-details-panel__controls').should('be.visible')
    cy.get('.keyblock-microblock-panel').should('be.visible')
  })
})
