describe('top accounts', () => {
  it('should display top accounts', () => {
    cy.visit('/accounts')

    cy.get('.top-accounts-table').should('be.visible')
    cy.get('.account-statistics__value').should('have.length', 2)
  })
})
