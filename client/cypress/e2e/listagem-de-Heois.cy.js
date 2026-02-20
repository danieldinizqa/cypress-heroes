describe('Listagem de Heróis', () => {

  const USER_EMAIL = 'admin@test.com'
  const USER_PASSWORD = 'test123'

  before(() => {

    cy.visit('http://localhost:3000')

    cy.contains('Login').click()
    cy.get('input[name="email"]').type(USER_EMAIL)
    cy.get('input[name="password"]').type(USER_PASSWORD)
    cy.contains('button', 'Sign in').click()

    cy.url().should('include', '/heroes')

  })

  it('Deve exibir Mulher Gato na listagem', () => {

    cy.contains('Mulher Gato').should('be.visible')

  })

})