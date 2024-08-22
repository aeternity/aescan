describe('unavailable', () => {

  it('should display contract does not exist page', () => {
    cy.visit('/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  // it('should display account does not exist page', () => {
  //   cy.visit('/accounts/abcd', { failOnStatusCode: false })
  //   cy.get('.title').contains('Not Found')
  // })
  // todo fix

  it('should display contract does not exist page', () => {
    cy.visit('/contracts/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display oracles does not exist page', () => {
    cy.visit('/oracles/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/keyblock/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/microblock/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/names/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display nfts does not exist page', () => {
    cy.visit('/nfts/abcd', { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display tokens does not exist page', () => {
    cy.visit(`/state-channels/abcd`, { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display transaction does not exist page', () => {
    cy.visit(`/transactions/abcd`, { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })

  it('should display tokens does not exist page', () => {
    cy.visit(`/tokens/abcd`, { failOnStatusCode: false })
    cy.get('.title').contains('Not Found')
  })


})
