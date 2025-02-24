describe('microblock details', () => {
  it('should display microblock detail', () => {
    cy.visit(`/microblocks/${Cypress.env('microblockAddress')}`)

    cy.get('.microblock-details-panel table').should('be.visible')
    cy.get('.microblock-transactions-panel .paginated-content').should('be.visible')
    cy.get('.paginated-content .multiselect__single').contains('All Types')
    cy.get('.microblock-transactions-table tbody tr').should('have.length', 7)
  })

  it('should display microblock not found page', () => {
    cy.visit('/microblocks/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Microblock Not Found')
  })

  it('should display filtered transactions from direct URL access', () => {
    cy.visit(`/microblocks/${Cypress.env('microblockAddress')}?txType=contract_call`)

    cy.get('.paginated-content .multiselect__single').contains('ContractCallTx')
    cy.get('.microblock-transactions-table tbody tr').should('have.length', 6)
    // todo fix
    cy.get('.microblock-transactions-table tbody tr').contains('td', 'ContractCallTx').should('have.length', 1)
  })

  it('should display filtered transactions by selecting option', () => {
    cy.visit(`/microblocks/${Cypress.env('microblockAddress')}`)

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'SpendTx').click()

    cy.url().should('include', 'txType=spend')
    cy.get('.paginated-content .multiselect__single').contains('SpendTx')
    cy.get('.microblock-transactions-table tbody tr').should('have.length', 1)

    cy.get('.paginated-content__highlighted').should('be.visible')
    cy.url().should('include', 'txType=spend')

    // todo read counter
  })

  it('should navigate back to previous filter option', () => {
    cy.visit('/microblocks/mh_2dDD1aj3foBG7HeVhZR4cLJgDiar9DYSW86L6VNSnRNXfkBabq?txType=contract_call')

    cy.get('.paginated-content .multiselect__single').contains('ContractCallTx')

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'SpendTx').click()
    cy.url().should('include', 'txType=spend')

    cy.go(-1)

    cy.get('.paginated-content .multiselect__single').contains('ContractCallTx')
    cy.url().should('include', 'txType=contract_call')

    // todo read counter
  })
  it('should cancel filter options', () => {
    cy.visit('/microblocks/mh_2dDD1aj3foBG7HeVhZR4cLJgDiar9DYSW86L6VNSnRNXfkBabq?txType=contract_call')

    cy.get('.paginated-content .multiselect').click()
    cy.contains('.paginated-content .multiselect__option', 'All Types').click()

    cy.get('.microblock-transactions-table tbody tr').should('have.length', 7)

    cy.url().should('eq', Cypress.config().baseUrl + '/microblocks/mh_2dDD1aj3foBG7HeVhZR4cLJgDiar9DYSW86L6VNSnRNXfkBabq')

    // todo read counter
  })
})
