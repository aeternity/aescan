describe('oracles', () => {
  it('should display oracles', () => {
    cy.visit('/oracles')

    cy.get('.oracles-table').should('be.visible')
  })

  it('should display inactive oracles', () => {
    cy.visit('/oracles')

    cy.get('.oracles-table__data').first()
      .invoke('text')
      .then(hash1 => {
        cy.get('.paginated-content .multiselect').click()
        cy.contains('.multiselect__option', 'Inactive').click()

        cy.get('.oracles-table__data').first()
          .invoke('text')
          .should(hash2 => {
            expect(hash1).not.to.eq(hash2)
          })
      })
  })

  it('should display inactive oracles and active after going back', () => {
    cy.visit('/oracles')

    cy.get('.oracles-table__data').first()
      .invoke('text')
      .then(hash1 => {
        cy.get('.paginated-content .multiselect').click()
        cy.contains('.multiselect__option', 'Inactive').click()

        cy.go(-1)

        cy.get('.oracles-table__data').first()
          .invoke('text')
          .should(hash2 => {
            expect(hash1).to.eq(hash2)
          })
      })
  })
})
