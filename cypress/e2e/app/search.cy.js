describe('search', () => {
  it('should display search results', () => {
    cy.visit('/')
    // loading waiting workaround
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type('c')
    cy.get('.search-bar__submit').click()

    cy.get('.search-names-table').should('be.visible')

    cy.contains('.tabs__item', 'Tokens').click()
    cy.get('.search-tokens-table').should('be.visible')

    cy.contains('.tabs__item', 'NFTs').click()
    cy.get('.search-nfts-table').should('be.visible')
  })

  it('should directly display account detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('accountAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.account-details-panel').should('be.visible')
  })

  it('should directly display transaction detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('transactionAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.transaction-general-panel').should('be.visible')
  })

  it('should directly display contract detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('contractAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.contract-details-panel').should('be.visible')
  })

  it('should directly display oracles detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('oracleAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.oracle-details-panel').should('be.visible')
  })

  it('should directly display state channels detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('stateChannelAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.state-channel-details-panel').should('be.visible')
  })

  it('should directly display microblocks detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('microblockAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.microblock-details-panel').should('be.visible')
  })

  it('should directly display keyblocks detail', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('keyblockAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.keyblock-details-panel').should('be.visible')
  })

  it('should directly display keyblocks detail by hash', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('keyblockHeight'))
    cy.get('.search-bar__submit').click()

    cy.get('.keyblock-details-panel').should('be.visible')
  })

  it('should display search result due to very high block height', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(999999999)
    cy.get('.search-bar__submit').click()

    cy.get('.page-header').should('contain', 'Search Results')
  })

  it('should directly display name detail by name', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('name'))
    cy.get('.search-bar__submit').click()

    cy.get('.search-names-table').should('be.visible')
  })

  it('should directly display name detail by name with .chain suffix', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('chainName'))
    cy.get('.search-bar__submit').click()

    cy.get('.name-details-panel').should('be.visible')
  })

  it('should directly display name detail by hash', () => {
    cy.visit('/')
    cy.get('.stats-panel').should('be.visible')

    cy.get('.search-bar__input').type(Cypress.env('nameAddress'))
    cy.get('.search-bar__submit').click()

    cy.get('.name-details-panel').should('be.visible')
  })
})
