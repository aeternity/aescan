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
  it('should filter by combinig parameters from URL', () => {
    cy.visit('/transactions?scope=time:1733871600-1733958000&txType=spend')
    // todo check first type
    // todo read button value
    // todo read select value
    cy.get('.transactions-table tbody tr').should('have.length', 10)
  })

  it('should cancel filtering and clear url', () => {
    cy.visit('/transactions?scope=time:1733871600-1733958000&txType=spend')

    // todo check first type
    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'All types').click()
    cy.get('.dp--clear-btn').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/transactions')
  })

  it('should select the date', () => {
    cy.visit('/transactions')

    // todo check first type
    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'SpendTx').click()
    cy.get('.paginated-content .scope-picker').click()
    cy.get('.dp__today').click()
    cy.get('.dp__today').parent().prev().click()
    cy.url().should('include', 'scope').should('include', 'txType=spend')
  })
})
