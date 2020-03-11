context("Admin page", () => {

    beforeEach(() => {
        cy.visit("http://localhost:4000/login");
    })


    it("Should log in as admin 'balthazar'", () => {
        
        cy.get('#username').type('balthazar').should('have.value', 'balthazar');
        cy.get('#password').type('1234').should('have.value', '1234');
        cy.get('#post-login-form').submit();

        // cy.contains("Archived Todos").click();
        // cy.url().should("include", "/archive");
        // cy.contains("Deleted Todos").click();
        // cy.url().should("include", "/deletetodo");
        // cy.contains("About").click();
        // cy.url().should("include", "/about");
        // cy.contains("Home").click();

    });

});