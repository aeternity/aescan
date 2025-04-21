describe('mining', () => {
  it('should display mining UI elements', () => {
    cy.visit('/mining')
    cy.get('.mining-statistics-grid .panel').should('have.length', 11)
    cy.get('.mining-statistics-grid canvas').should('have.length', 2)

    cy.get('.miners-panel__table').should('be.visible')

    cy.contains('.tabs__item', 'Latest Keyblocks').click()
    cy.get('.keyblocks-table').should('be.visible')
  })
})
