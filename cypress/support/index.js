/* globals Cypress, before */

let polyfill;

// Load unfetch polyfill.
before(() => {
  const polyfillUrl = "https://unpkg.com/unfetch/dist/unfetch.umd.js";
  cy.request(polyfillUrl).then((response) => (polyfill = response.body));
});

Cypress.on("window:before:load", (win) => {
  delete win.fetch;
  // Replace window fetch with polyfilled XHR that Cypress
  // can mock out.
  win.eval(polyfill);
  win.fetch = win.unfetch;
});
