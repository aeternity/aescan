describe('top accounts', () => {
  it('should display top accounts', () => {
    cy.visit('/accounts')

    cy.get('.line-chart').should('be.visible')
    cy.get('.top-accounts-table').should('be.visible')
    cy.get('.accounts-statistics__value').should('have.length', 2)
  })
})
