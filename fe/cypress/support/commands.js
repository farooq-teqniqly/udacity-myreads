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
Cypress.Commands.add("openSearch", () => {
  cy.get(".open-search a").click();
});

Cypress.Commands.add("doSearch", (query) => {
  cy.get(".search-books-input-wrapper input").type(query);
});

Cypress.Commands.add("clearSearch", () => {
  cy.get(".search-books-input-wrapper input").clear();
});

Cypress.Commands.add("closeSearch", () => {
  cy.get(".close-search").click();
});

Cypress.Commands.add("selectBookByTitle", (title) => {
  cy.get(".book")
    .contains(".book-title", title)
    .closest(".book")
    .as("selectedBook");
});

Cypress.Commands.add("verifyBookAuthors", (authors) => {
  cy.get("@selectedBook").find(".book-authors").should("have.text", authors);
});
