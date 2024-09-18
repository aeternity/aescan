describe('homepage', () => {
  it('should display homepage', () => {
    cy.visit('/')
    // todo improve satisfy
    cy.get('.stats-panel').should('be.visible')
    cy.get('.dashboard-state-channels-panel table').should('be.visible')
    cy.get('.dashboard-auctions-panel')
      .should('satisfy', elements => {
        let hasContent = false
        elements[0].childNodes.forEach(element => {
          if (element.localName === 'table' || element.className === 'blank-state') {
            hasContent = true
          }
        })
        return hasContent
      })
    cy.get('.dashboard-names-panel table').should('be.visible')
    cy.get('.dashboard-keyblock-panel table').should('be.visible')
    cy.get('.search-bar').should('be.visible')
  })

  it('should display not found page', () => {
    cy.visit('/wrong',
      { failOnStatusCode: false })
    cy.get('.title').contains('Page Not Found')
  })
})
