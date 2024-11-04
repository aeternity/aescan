describe('charts', () => {
  it('should display transactions chart UI elements', () => {
    cy.visit('/charts/transactions')
    cy.get('.charts-navigation__link').should('be.visible')
    cy.get('.chart-controls__button').should('be.visible')
    cy.get('.range-picker').should('be.visible')
    cy.get('.transactions-chart-panel__select').should('be.visible')
    cy.get('.line-chart canvas').should('be.visible')
    cy.get('.chart-controls__button').should('be.visible')
  })
  it('should display keyblock chart', () => {
    cy.visit('/charts/keyblocks')
    cy.get('.line-chart canvas').should('be.visible')
  })
  it('should display contracts chart', () => {
    cy.visit('/charts/contracts')
    cy.get('.line-chart canvas').should('be.visible')
  })
  it('should display names chart', () => {
    cy.visit('/charts/names')
    cy.get('.line-chart canvas').should('be.visible')
  })
  it('should display difficulty', () => {
    cy.visit('/charts/difficulty')
    cy.get('.line-chart canvas').should('be.visible')
  })
  it('should display hashrate', () => {
    cy.visit('/charts/hashrate')
    cy.get('.line-chart canvas').should('be.visible')
  })
})
