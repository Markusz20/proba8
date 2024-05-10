describe('Felhasználó elfelejtett jelszo', () => {
  beforeEach('',()=>{
    cy.visit('http://localhost:5173/login')
    cy.wait(3000)
  })

  it('Elfelejtett jelszo teszt',()=>{
    cy.get('[data-testid="cypress-elfelejtettem-a-jelszavam"]').should('have.text','Elfelejtettem a jelszavam.').click()
    cy.get('#email').type('almaretes@gmail.com')
    cy.get('#biztonsagikod').type('alma')
    cy.get('[data-testid="cypress-bekuldes"]').should('have.text','Beküldés').click()
    cy.get('#password').type('asdasdasd')
    cy.get('#password2').type('asdasdasd')
    cy.get('[data-testid="cypress-jelszo-mentese"]').should('have.text','Jelszó mentése').click()
    cy.get('#email').type('almaretes@gmail.com')
    cy.get('#jelszo').type('asdasdasd')
    cy.get('[data-testid="cypress-title"]').should('have.text','Belépés').click()
  })
  
})