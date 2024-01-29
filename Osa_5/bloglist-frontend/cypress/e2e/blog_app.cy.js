describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const user = {
      name: 'Matti Pirhonen',
      username: 'mapir',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173/')
  })

  it('Login form is shown', function () {

    //Open our login form since it is hidden at first
    cy.contains('log in').click()

    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')

  })
  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      //Open login form
      cy.contains('log in').click()

      //Type in user information
      cy.get('#username').type('mapir')
      cy.get('#password').type('salainen')

      //Click log in button
      cy.get('#login-button').click()

      //check that we are logged in as correct user
      cy.contains('Matti Pirhonen logged in')
    })
    it('fails with wrong credentials', function () {
      //Open login form
      cy.contains('log in').click()
      //fill in wrong credentials
      cy.get('#username').type('mluuk')
      cy.get('#password').type('asilaen')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Pirhonen logged in')

    })

  })
  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({username:'mapir', password:'salainen'})
    })
    it.only('A blog can be created', function () {
      //create blog and make sure it is listed.
      cy.contains('new blog').click()

      //Insert information of blog
      cy.get('#blog-input-title').type('Test Title')
      cy.get('#blog-input-author').type('Test Author')
      cy.get('#blog-input-url').type('Test URL')

      cy.get('#createButton').click()

    

      cy.get('.blog')
      .should('contain', 'Test Title')
        .and('contain', 'Test Author')

    })
  })


})