describe('Felhasználó login teszt', () => {
  beforeEach('',()=>{
    cy.visit('http://localhost:5173/login')
    cy.wait(3000)
  })

  it('Belépés teszt',()=>{
    cy.get('#email').type('almaretes@gmail.com')
    cy.get('#jelszo').type('asdasdasd')
    cy.get('[data-testid="cypress-title"]').should('have.text','Belépés').click()
  
  })
  
})