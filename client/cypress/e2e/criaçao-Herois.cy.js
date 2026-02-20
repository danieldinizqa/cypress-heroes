describe('Criar novos heróis', () => {
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

  // ESTE BLOCO É O QUE ESTAVA FALTANDO NA RODADA ANTERIOR
  beforeEach(() => {
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('http://localhost:3000')

    // Clica no login e entra com as credenciais que você validou com o GPT
    cy.contains('Login').click()
    cy.get('input[name="email"]').type(USER_EMAIL)
    cy.get('input[name="password"]').type(USER_PASSWORD)
    cy.contains('button', 'Sign in').click()

    // Garante que o login terminou antes de seguir para o teste
    cy.url().should('include', '/heroes')
  })

  heroes.forEach((hero) => {
    it(`Deve criar o herói: ${hero.name}`, () => {
      // Agora ele vai encontrar o botão porque o beforeEach já logou!
      cy.contains('New Hero').click()
      cy.url().should('include', '/heroes/new')

      cy.get('input[name="name"]').type(hero.name)
      cy.get('input[name="price"]').clear().type(hero.price)
      cy.get('input[name="fans"]').clear().type(hero.fans)
      cy.get('input[name="saves"]').clear().type(hero.saves)
      cy.get('select[name="powers"]').select(hero.power)

      cy.readFile(`cypress/fixtures/${hero.img}`, null).then((fileContent) => {
        cy.get('input[type="file"]').selectFile(
          {
            contents: fileContent,
            fileName: hero.img,
            mimeType: 'image/jpeg',
          },
          { force: true }
        )
      })

      cy.contains('button', 'Submit').click()
      cy.url().should('include', '/heroes')
      cy.contains(hero.name).should('be.visible')
    })
  })
})