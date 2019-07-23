describe("Adding todo", () => {
  it("successfully adds todo", () => {
    // Mock out API.
    cy.server();
    cy.route("http://localhost:3001/todos", "fixture:todos/all.json");
    cy.route("http://localhost:3001/users", "fixture:users/all.json");
    cy.route(
      "POST",
      "http://localhost:3001/todos",
      "fixture:todos/create.json"
    );

    // Visit page.
    cy.visit("http://localhost:3000", {
      onBeforeLoad: (win) => delete win.fetch
    });

    // Click button to open form.
    cy.get(".add-todo-btn").click();

    // Fill out the form.
    cy.get(".add-todo-form")
      .contains("Title")
      .siblings("input")
      .first()
      .type("Eat the pizza 🍕");
    cy.get(".add-todo-form")
      .contains("User")
      .siblings("select")
      .first()
      .select("John User");

    // Submit.
    cy.get(".add-todo-form")
      .get("button")
      .contains("Add")
      .click();

    // Expect the new todo to be on the page.
    expect(cy.get("span").contains("Eat the pizza 🍕")).to.exist;
    expect(
      cy
        .get("span")
        .contains("Eat the pizza 🍕")
        .parent("h2")
        .parent(".todo")
        .contains("John User")
    ).to.exist;
  });
});
