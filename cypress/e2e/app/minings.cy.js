describe('mining', () => {
  it('should display mining UI elements', () => {
    cy.visit('/charts/mining')
    cy.get('.mining-statistics-grid .panel').should('have.length', 10)
    cy.get('.mining-statistics-grid canvas').should('have.length', 2)

    cy.get('.mining-pools-table').should('be.visible')

    cy.contains('.tabs__item', 'Miners').click()
    cy.get('.miners-panel__table').should('be.visible')

    cy.contains('.tabs__item', 'Latest Keyblocks').click()
    cy.get('.keyblocks-table').should('be.visible')
  })
})
