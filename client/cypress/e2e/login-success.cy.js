describe('Login simples', () => {

  it('Deve logar com sucesso', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')

    // Abre o modal de login
    cy.contains('Login').click()

    // Preenche credenciais
    cy.get('input[name="email"]').type('admin@test.com')
    cy.get('input[name="password"]').type('test123')

    // Clica no botão correto do modal
    cy.contains('button', 'Sign in').click()

    // Apenas valida que foi redirecionado
    cy.url().should('include', '/heroes')

  })

})