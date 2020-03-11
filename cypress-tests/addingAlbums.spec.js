context("Admin page", () => {

    beforeEach(() => {
        cy.visit("http://localhost:4000/admin");
    })


    it("Should load admin page", () => {
        
        cy.get('#urlLastFm').type('https://www.last.fm/music/Christine+and+the+Queens/Chris').should('have.value', 'https://www.last.fm/music/Christine+and+the+Queens/Chris');
        cy.get('#post-album-form').submit();
        // cy.contains("Archived Todos").click();
        // cy.url().should("include", "/archive");
        // cy.contains("Deleted Todos").click();
        // cy.url().should("include", "/deletetodo");
        // cy.contains("About").click();
        // cy.url().should("include", "/about");
        // cy.contains("Home").click();

    });

});