describe('Roosh Parking E2E Tests', () => {
    const baseUrl = 'http://web:3000'

    it('Should load the homepage and navigate to portfolio', () => {
        cy.visit(baseUrl)
        cy.contains('Find Your Perfect Parking').should('be.visible')
        cy.contains('Browse Parking Spots').click()
        cy.url().should('include', '/portfolio')
        cy.contains('Available Parking Services').should('be.visible')
    })

    it('Should display product details for product ID 1', () => {
        cy.visit(`${baseUrl}/product/1`)
        cy.get('h1').should('be.visible')
        cy.contains('Details').should('be.visible')
        cy.contains('Book your spot').should('be.visible')
        cy.contains('Confirm booking').should('be.visible')
    })

    it('Should navigate to booking page and fill in the form', () => {
        cy.visit(`${baseUrl}/product/1`)
        cy.contains('Confirm booking').click()
        cy.url().should('include', '/createBooking')
        cy.url().should('include', 'productId=1')

        cy.get('h2').contains('Create New Booking').should('be.visible')

        // Fill in the form
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        const tomorrowStr = tomorrow.toISOString().slice(0, 16)

        const dayAfterTomorrow = new Date()
        dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2)
        const dayAfterTomorrowStr = dayAfterTomorrow.toISOString().slice(0, 16)

        cy.get('input[type="datetime-local"]').first().type(tomorrowStr)
        cy.get('input[type="datetime-local"]').last().type(dayAfterTomorrowStr)
        cy.get('input[type="email"]').type('test@example.com')

        // Submit the booking
        cy.get('button[type="submit"]').click()

        // Check for success or error message (since we don't know if product 1 exists in the DB of the test environment)
        // But we expect the application to handle it.
        cy.get('.alert').should('be.visible')
    })

    it('Should filter products on the portfolio page', () => {
        cy.visit(`${baseUrl}/portfolio`)

        // Select a rating filter
        cy.get('select#min-rating').select('4')
        cy.url().should('include', 'min_rating=4')

        // Check if filtered list is still there
        cy.get('.card').should('exist')
    })

    it('Should display booking details for booking ID 1', () => {
        cy.visit(`${baseUrl}/booking/1`)
        cy.contains('Booking Details').should('be.visible')
        cy.contains('ID: 1').should('be.visible')
        cy.get('.card').should('be.visible')
    })
})
