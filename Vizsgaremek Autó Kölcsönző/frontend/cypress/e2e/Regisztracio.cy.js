describe('Felhasználó regisztráció teszt', () => {
  beforeEach('',()=>{
    cy.visit('http://localhost:5173/register')
    cy.wait(3000)
  })

  it('Regisztráció teszt',()=>{
    cy.get('#username').type('almaretes')
    cy.get('#email').type('almaretes@gmail.com')
    cy.get('#password').type('asdasdasd')
    cy.get('#password2').type('asdasdasd')
    cy.get('[data-testid="cypress-title"]').should('have.text','Regisztráció').click()
  
  })
  
})