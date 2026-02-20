describe('Controle de Permissão - UI', () => {

  const USER_EMAIL = 'admin@test.com'
  const USER_PASSWORD = 'test123'

  beforeEach(() => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')

    cy.contains('Login').click()
    cy.get('input[name="email"]').type(USER_EMAIL)
    cy.get('input[name="password"]').type(USER_PASSWORD)
    cy.contains('button', 'Sign in').click()

    cy.url().should('include', '/heroes')

  })

  it('Usuário admin deve visualizar botão de excluir', () => {

    cy.get('[data-cy="trash"]')
      .should('exist')
      .and('be.visible')

  })

})