import { MemoryRouter } from "react-router-dom";
import TransactionsContainer from "./TransactionsContainer";
export const appUrl = process.env.APP_URL;

describe("Transactions Container", () => {
  it("should not render transactions", () => {
    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <TransactionsContainer />
      </MemoryRouter>
    );
    cy.get("[data-test*=empty-list-header]").should("exist");
  });
  it("should render public transactions", () => {
    cy.intercept("https://appqa.vercel.app/transactions/*", {
      fixture: "public-transactions.json",
    });
    cy.mount(
      <MemoryRouter initialEntries={["/"]}>
        <TransactionsContainer />
      </MemoryRouter>
    );
    cy.get("[data-test*=empty-list-header]").should("not.exist");
    cy.get(".MuiListSubheader-root").should("contain", "Public");
  });
  it("should render contacts transactions", () => {
    cy.intercept("https://appqa.vercel.app/transactions/*", {
      fixture: "public-transactions.json",
    });
    cy.mount(
      <MemoryRouter initialEntries={["/contacts"]}>
        <TransactionsContainer />
      </MemoryRouter>
    );
    cy.get("[data-test*=empty-list-header]").should("not.exist");
    cy.get(".MuiListSubheader-root").should("contain", "Contacts");
  });
  it("should render personal transactions", () => {
    cy.intercept("https://appqa.vercel.app/transactions", {
      fixture: "public-transactions.json",
    });
    cy.mount(
      <MemoryRouter initialEntries={["/personal"]}>
        <TransactionsContainer />
      </MemoryRouter>
    );
    cy.get("[data-test*=empty-list-header]").should("not.exist");
    cy.get(".MuiListSubheader-root").should("contain", "Personal");
  });
});
