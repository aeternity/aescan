describe('contract verification', () => {
  it('should display contract verification page', () => {
    cy.visit('/contract-verification')

    cy.get('.contract-verification-form__select').should('be.visible')
    cy.get('.contract-verification-form__text-input').should('be.visible')
    cy.get('.contract-verification-form__submit').should('be.visible')
    cy.get('.contracts-file-upload__drop-area').should('be.visible')
    cy.get('#consent').should('be.visible')
  })
})
