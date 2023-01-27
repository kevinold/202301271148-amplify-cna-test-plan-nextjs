/// <reference types="cypress" />

describe("Directory redirect - 301", () => {
  it("should redirect /c to /d", () => {
    cy.visit("/c");
    cy.url().should("match", /d$/);
    cy.getBySel("content").should("have.text", "This is the D index route");
  });
  it("/a should return status code 301", () => {
    cy.request({
      url: "/a",
      followRedirect: false, // turn off following redirects
    }).then((resp) => {
      // redirect status code is 301
      expect(resp.status).to.eq(301);
    });
  });
});
