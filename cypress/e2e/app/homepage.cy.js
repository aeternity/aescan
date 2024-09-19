describe('homepage', () => {
  it('should display homepage', () => {
    cy.visit('/')

    cy.get('.stats-panel').should('be.visible')
    cy.get('.dashboard-state-channels-panel table').should('be.visible')
    cy.get('.dashboard-auctions-panel')

      .should('satisfy', elements => {
        return Array.from(elements[0].childNodes).some(element => {
          if (element.localName === 'table' || element.className === 'blank-state') {
            return true
          } else {
            return false
          }
        })
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
