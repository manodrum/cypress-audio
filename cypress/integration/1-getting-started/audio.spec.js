/// <reference types="cypress" />
import { isText, isBinary, getEncoding } from 'istextorbinary/edition-es2019/index'

// Welcome to Cypress!
//
// This spec file contains a variety of sample tests
// for a todo list app that are designed to demonstrate
// the power of writing tests in Cypress.
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe('example to-do app', () => {
    beforeEach(() => {
        // Cypress starts out with a blank slate for each test
        // so we must tell it to visit our website with the `cy.visit()` command.
        // Since we want to visit the same URL at the start of all our tests,
        // we include it in our beforeEach function so that it runs before each test

        cy.visit('http://localhost:3000')
    })

    it('plays audio from cypress', () => {
        cy.fixture("ui_testing.wav", "binary").then((audio) => {
            console.log("encoding: ", getEncoding(audio))
            console.log("isBinary: ", isBinary(null, audio))
            console.log("isText: ", isText(null, audio))
            cy.intercept(
                { method: "GET", hostname: "localhost", path: "/ui_testing.wav" },
                {
                    headers: { "Content-Type": "application/octet-stream" },
                    body: audio,
                }
            ).as("audio_sample")
        })

        cy.get("button").click()
    })
})
