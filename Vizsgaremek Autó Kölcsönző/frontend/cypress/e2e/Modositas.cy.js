describe('Modositas teszt', () => {
  beforeEach('',()=>{
    cy.visit('http://localhost:5173/login')
    cy.wait(3000)
  })

  it('Modositas teszt',()=>{
    cy.get('#email').type('almaretes@gmail.com')
    cy.get('#jelszo').type('asdasdasd')
    cy.get('[data-testid="cypress-title"]').should('have.text','Belépés').click()
    cy.wait(3000)
    cy.visit('http://localhost:5173/modositas')
    cy.get('#nev').type('Nagy Géza')
    cy.get('#biztonsagikod').type('asdasd')
    cy.get('#jogositvanyszama').type('123123123')
    cy.get('#telefonszam').type('06706899874')
    cy.get('#isz').type('5630')
    cy.get('#varos').type('Békés')
    cy.get('#cim').type('Alma utca') 
    cy.get('[data-testid="cypress-Adatmodositas"]').should('have.text','Adatmódosítás').click()
  })
  
})