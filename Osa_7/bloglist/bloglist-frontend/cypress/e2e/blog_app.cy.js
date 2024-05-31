describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user = {
      name: 'Matti Pirhonen',
      username: 'mapir',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

    const user2 = {
      name: 'Joni Laatikainen',
      username: 'jolaa',
      password: 'salainen123'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)

    cy.visit('')
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
      cy.login({ username: 'mapir', password: 'salainen' })
    })
    it('A blog can be created', function () {
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
        .and('contain', 'view')

    })
    describe('And a blog exists', function () {
      beforeEach(function () {

        const blog = {
          author: 'Matti Näsä',
          url: 'www.matti.blog.com/blog',
          title: 'Kummelin kulta-aika',
          likes: 123,
        }

        cy.createBlog(blog)

        const blog2 = {
          author: 'Tero Nuppi',
          url: 'www.tero.nuppi.com/blog',
          title: 'Teron ja Esan kommelluksia',
          likes: 124,
        }

        cy.createBlog(blog2)

      })
      it('A blog can be liked', function () {
        cy.contains('Matti Näsä').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('@viewButton').should('contain', 'hide')

        cy.contains('www.matti.blog.com/blog').parent().find('#likeButton').as('likeButton')
        cy.get('@likeButton').click()

        //likes increased by one
        cy.contains('likes 124')

        //Another like test
        cy.get('@likeButton').click()
        cy.contains('likes 125')

      })
      it('A blog can be removed by it created person', function () {
        cy.contains('Tero Nuppi').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.get('@viewButton').should('contain', 'hide')

        cy.contains('www.tero.nuppi.com/blog').parent().find('#removeButton').as('removeButton')

        //Attempting to remove
        cy.get('@removeButton').click()


        cy.contains('Blog "Teron ja Esan kommelluksia" by Tero Nuppi deleted')


        cy.get('html').should('not.contain', 'www.tero.nuppi.com/blog')

      })

      it('A blogs remove button is not visible other than for it created user', function () {

        //Remove button is found with correct user
        cy.contains('Tero Nuppi').parent().find('button').as('viewButton')
        cy.get('@viewButton').click()
        cy.contains('www.tero.nuppi.com/blog').parent().find('#removeButton').as('removeButton')

        //logout
        cy.contains('logout').click()

        //Log back in with another user
        cy.contains('log in').click()
        cy.get('#username').type('jolaa')
        cy.get('#password').type('salainen123')
        cy.get('#login-button').click()

        //view all content
        cy.contains('view').first().click()
        cy.contains('view').first().click()

        //Make sure there is NOT remove button for blog that the user did not create
        cy.get('html')
          .should('not.contain', '#removeButton')


        //lets make sure there is remove button for a blog we create with the new user
        cy.contains('new blog').click()
        cy.get('#blog-input-title').type('Test Title')
        cy.get('#blog-input-author').type('Test Author')
        cy.get('#blog-input-url').type('Test URL')

        cy.get('#createButton').click()

        cy.contains('view').first().click()

        cy.contains('Test URL').parent().find('#removeButton').as('removeButton')

      })
      it('Blogs are ordered by likes', function () {

        //view two existing blogs
        cy.contains('view').click()
        cy.contains('view').click()

        cy.get('.blog').eq(0).should('contain', 'Teron ja Esan kommelluksia')
        cy.get('.blog').eq(1).should('contain', 'Kummelin kulta-aika')

        //click the less liked blog three times

        cy.contains('www.matti.blog.com/blog').parent().find('#likeButton').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('likes 124')
        cy.get('@likeButton').click()

        //Order is reversed
        cy.get('.blog').eq(1).should('contain', 'Teron ja Esan kommelluksia')
        cy.get('.blog').eq(0).should('contain', 'Kummelin kulta-aika')

      })
    })
  })




})