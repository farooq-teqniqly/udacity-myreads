// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("addBook", () => {
  cy.get(".open-search a").should("be.visible").click();
});

Cypress.Commands.add("closeSearch", () => {
  cy.get(".close-search").should("be.visible").click();
});

Cypress.Commands.add("search", (query) => {
  cy.get("input").clear();
  cy.get("input").type(query);
  cy.get("#search-book-button").click();
});

Cypress.Commands.add("addBookToShelf", (bookIndex, shelfId) => {
  cy.get(".book-title")
    .eq(bookIndex)
    .parent()
    .find(".book-shelf-changer select")
    .select(shelfId);
});
