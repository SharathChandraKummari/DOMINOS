const baseUrl = Cypress.env('baseUrl')
const authTocken = Cypress.env('authTocken')
require('cypress-iframe');
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
Cypress.Commands.add('verifyTitle', (title)=>{
    cy.title().should('eql', title)
})

Cypress.Commands.add('POST_Request', (resourcePath, payLoad)=>{
    cy.request({
        method:'POST',
        url:baseUrl+resourcePath,
        auth:{bearer:authTocken},
        body:payLoad,
        failOnStatusCode:false
    })
})

Cypress.Commands.add('PUT_Request', (resourcePath, payLoad)=>{
        cy.request({
        method:'PUT',
        url:baseUrl+resourcePath,
        auth:{bearer:authTocken},
        body:payLoad
    })
})

Cypress.Commands.add('GET_Request', (resourcePath)=>{
    cy.request({
        method:'GET',
        url:baseUrl+resourcePath,
        auth:{bearer:authTocken}
    })
})

Cypress.Commands.add('DELETE_Request', (resourcePath)=>{
    cy.request({
        method:'DELETE',
        url:baseUrl+resourcePath,
        auth:{bearer:authTocken}
    })
})

Cypress.Commands.add('CloseBannerIfPresent',()=>{
    cy.get('body').then((body)=>{
        if(body.find('#moe-onsite-campaign-647f0e10e368e2e133fddcb2').length>0){
            cy.get('#moe-onsite-campaign-647f0e10e368e2e133fddcb2', {timeout:20000}).should('be.visible').then((iframe)=>{
                const $body = iframe.contents().find('body')
                cy.wrap($body).find('#close-icon').click()
            })
        }
    })
})