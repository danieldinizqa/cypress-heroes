describe('Login simples', () => {

  it('Não deve logar com credenciais inválidas', () => {

    cy.clearCookies()
    cy.clearLocalStorage()

    cy.visit('http://localhost:3000')

    // Abre o modal de login
    cy.contains('Login').click()

    // Preenche credenciais
    cy.get('input[name="email"]').type('hero@heroes.com')
    cy.get('input[name="password"]').type('hero123')

    // Clica no botão correto do modal
    cy.contains('button', 'Sign in').click()

    // Apenas valida que foi redirecionado
    cy.url().should('include', '/heroes')

    cy.contains('Invalid').should('be.visible')

  })

})