describe('transactions', () => {
  it('should display transactions', () => {
    cy.visit('/transactions')

    cy.get('.transactions-table').should('be.visible')
    cy.get('.line-chart').should('be.visible')
    cy.get('.transaction-statistics__panel').should('be.visible')
    cy.get('.transaction-statistics__panel .chip').should('be.visible')
  })

  // todo add multiple tests

  it('should display same transactions after going back from detail', () => {
    cy.visit('/transactions')

    cy.get('.transactions-table__data').first()
      .invoke('text')
      .then(hash1 => {
        const transactionDetailLink = cy.get('.transactions-table__data').first().find('.u-hidden-mobile a')
        transactionDetailLink.click()

        cy.get('.copy-chip__text') // workaround to time out before going back get the element

        cy.go(-1)

        cy.get('.transactions-table__data').first()
          .invoke('text')
          .should(hash2 => {
            expect(hash1).to.eq(hash2)
          })
      })
  })
})
