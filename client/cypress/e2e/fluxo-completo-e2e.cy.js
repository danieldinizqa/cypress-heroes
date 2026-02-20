describe('Fluxo Profissional: Limpar e Cadastrar', () => {
  const USER_EMAIL = 'admin@test.com'
  const USER_PASSWORD = 'test123'

  const heroes = [
    { name: 'Mulher Gato', price: '100', fans: '100', saves: '1', power: 'Invisibility', img: 'm-gato.jpg' },
    { name: 'Batman', price: '81', fans: '90', saves: '38', power: 'Super Logistics', img: 'batman.jpg' },
    { name: 'Superman', price: '90', fans: '120', saves: '45', power: 'Super Strength', img: 'superman.jpg' },
    { name: 'Poison Ivy', price: '75', fans: '80', saves: '25', power: 'Mind Control', img: 'poison-ivy.jpg'},
    { name: 'Spider-Man', price: '85', fans: '100', saves: '30', power: 'Super Strength', img: 'spider-man.jpg'},
    { name: 'Wonder Woman', price: '95', fans: '110', saves: '40', power: 'Super Speed', img: 'wonder-woman.jpg'}
  ]

  it('Deve limpar e cadastrar sem perder a sessão', () => {
    // 1. LOGIN REFORÇADO
    cy.visit('http://localhost:3000')
    cy.contains('Login').click()
    cy.get('input[name="email"]').type(USER_EMAIL)
    cy.get('input[name="password"]').type(USER_PASSWORD)
    cy.contains('button', 'Sign in').click()
    
    // Garantia de que o token de login foi salvo
    cy.url().should('include', '/heroes')
    cy.wait(1000) 

    // 2. LIMPEZA (Usando o botão de lixeira diretamente)
    // Invertemos a lista para não dar erro de posição
    const reverseHeroes = [...heroes].reverse()
    
    reverseHeroes.forEach((hero) => {
      cy.get('body').then(($body) => {
        if ($body.text().includes(hero.name)) {
          // Clica na lixeira do herói específico
          cy.contains(hero.name)
            .closest('div')
            .find('button')
            .last()
            .click({ force: true })

          // Se aparecer aquele alerta de "You must log in", o teste vai falhar aqui
          // Mas com o wait(1000) acima, o token deve estar ativo
          cy.contains('button', 'Yes', { timeout: 10000 })
            .should('be.visible')
            .click({ force: true })
            
          cy.wait(800)
        }
      })
    })

    // 3. CADASTRO
    heroes.forEach((hero) => {
      cy.visit('http://localhost:3000/heroes/new')
      
      cy.get('input[name="name"]').type(hero.name)
      cy.get('input[name="price"]').clear().type(hero.price)
      cy.get('input[name="fans"]').clear().type(hero.fans)
      cy.get('input[name="saves"]').clear().type(hero.saves)
      cy.get('select[name="powers"]').select(hero.power)

      cy.readFile(`cypress/fixtures/${hero.img}`, null).then((fileContent) => {
        cy.get('input[type="file"]').selectFile(
          { contents: fileContent, fileName: hero.img, mimeType: 'image/jpeg' },
          { force: true }
        )
      })

      cy.contains('button', 'Submit').click()
      
      // Se der 401 aqui, ele vai parar e mostrar o erro
      cy.url().should('include', '/heroes')
      cy.contains(hero.name).should('be.visible')
    })
  })
})