describe('Limpeza Completa do Banco de Dados', () => {
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

  it('Deve apagar todos os heróis da tela até a lista ficar vazia', () => {
    const deleteFirstHero = () => {
      cy.get('body').then(($body) => {
        // Seleciona botões de lixeira (normalmente o último do card)
        const deleteButtons = $body.find('button').filter((i, el) => {
          return el.innerText.trim() === '' || el.innerHTML.includes('svg');
        });

        if (deleteButtons.length > 0) {
          cy.wrap(deleteButtons).last().click({ force: true })

          // PROCURA O BOTÃO DE CONFIRMAÇÃO (Tenta "Yes", se não achar tenta o botão com cor de destaque)
          cy.wait(500) // Pequena pausa para o modal animar
          
          cy.get('body').then(($modalBody) => {
            // Se achar um botão que contém "Yes", clica. Se não, clica no botão principal do modal.
            if ($modalBody.find('button:contains("Yes")').length > 0) {
              cy.contains('button', 'Yes').click({ force: true })
            } else {
              // Clica no botão que tem cara de "botão de ação" no modal
              cy.get('button').last().click({ force: true })
            }
          })

          // Espera o banco processar antes da próxima volta
          cy.wait(1000)
          deleteFirstHero()
        } else {
          cy.log('Banco de dados limpo!')
        }
      })
    }

    deleteFirstHero()
  })
})