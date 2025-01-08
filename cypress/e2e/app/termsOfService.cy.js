describe('terms of service', () => {
  it('should display terms of service', () => {
    cy.visit('/terms-of-service')
    cy.get('.terms-of-service__paragraph').should('be.visible')
  })

  it('should display privacy policy', () => {
    cy.visit('/privacy-policy')
    cy.get('.privacy-policy__paragraph').should('be.visible')
  })
})
