context("Admin page", () => {

    beforeEach(() => {
        cy.visit("http://localhost:4000/admin");
    })


    it("Should load admin page and add 7 albums", () => {
        
        cy.get('#urlLastFm').type('https://www.last.fm/music/Christine+and+the+Queens/Chris').should('have.value', 'https://www.last.fm/music/Christine+and+the+Queens/Chris');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/Madonna/The+Immaculate+Collection').should('have.value', 'https://www.last.fm/music/Madonna/The+Immaculate+Collection');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/The+Beatles/Abbey+Road').should('have.value', 'https://www.last.fm/music/The+Beatles/Abbey+Road');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/Madonna/Celebration').should('have.value', 'https://www.last.fm/music/Madonna/Celebration');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/Nas/Illmatic').should('have.value', 'https://www.last.fm/music/Nas/Illmatic');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/The+xx/I+See+You').should('have.value', 'https://www.last.fm/music/The+xx/I+See+You');
        cy.get('#post-album-form').submit();
        cy.get('#urlLastFm').type('https://www.last.fm/music/2Pac/Me+Against+the+World').should('have.value', 'https://www.last.fm/music/2Pac/Me+Against+the+World');
        cy.get('#post-album-form').submit();

    });

});