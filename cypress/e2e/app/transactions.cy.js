describe('transactions', () => {
  it('should display transactions', () => {
    cy.visit('/transactions')

    cy.get('.transactions-table').should('be.visible')
    cy.get('.line-chart').should('be.visible')
    cy.get('.transaction-statistics__panel').should('be.visible')
    cy.get('.transaction-statistics__panel .chip').should('be.visible')
  })

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

  it('should select  date', () => {
    cy.visit('/transactions')

    cy.get('.paginated-content .scope-picker').click()
    cy.get('.dp__today').click()
    cy.get('.dp__today').parent().prev().click()

    cy.url().should('include', 'scope=')
    cy.get('.paginated-content .dp__input').should('not.have.value', '')
  })
  it('should select type', () => {
    cy.visit('/transactions')

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'SpendTx').click()

    cy.url().should('include', 'txType=spend')
    cy.get('.paginated-content .multiselect__single').contains('SpendTx')
  })

  it('should select combined parameters', () => {
    cy.visit('/transactions')

    cy.get('.paginated-content .scope-picker').click()
    cy.get('.dp__today').click()
    cy.get('.dp__today').parent().prev().click()

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'NameClaimTx').click()

    cy.url().should('include', 'txType=name_claim').should('include', 'scope=')
    cy.get('.paginated-content .multiselect__single').contains('NameClaimTx')
    cy.get('.paginated-content .dp__input').should('not.have.value', '')
  })

  it('should filter by combining parameters from direct URL access', () => {
    cy.visit('/transactions?scope=time:1733871600-1733958000&txType=contract_create')

    cy.get('.paginated-content .multiselect__single').contains('ContractCreateTx')
    cy.get('.transactions-table tbody tr').should('have.length', 10)
    cy.get('.transactions-table tbody tr').contains('td', 'ContractCreateTx').should('have.length', 1)
    cy.get('.paginated-content .dp__input')
      .should('have.value', '12/11/2024 - 12/12/2024')
  })

  it('should cancel filtering and clear url', () => {
    cy.visit('/transactions?scope=time:1733871600-1733958000&txType=spend')

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'All Types').click()
    cy.get('.dp--clear-btn').click()

    cy.url().should('eq', Cypress.config().baseUrl + '/transactions')
    cy.get('.paginated-content .multiselect__single').contains('All Types')
    cy.get('.paginated-content .dp__input').should('have.value', '')
  })
})
