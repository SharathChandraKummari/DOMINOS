/// <reference types="Cypress" />

import HomePage from "../support/pageObjects/homePage.js"
import DeliveryTypePage from "../support/pageObjects/deliveryTpyePage.js"
import MenuPage from "../support/pageObjects/menuPage.js"

describe("Menu Suit", ()=>{

beforeEach("Launch Site And Verify Title",()=>{

    cy.visit(Cypress.env('url'))
    cy.verifyTitle("Domino’s Pizza – Order Online | Get 2 Regular Pizza @99 Each")
})

it("Verify Menu Headers", ()=>{

    let homePage = new HomePage()
    homePage.clickOnOrderOnlineNow();

    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")
    let deliveryTypePage = new DeliveryTypePage()
    deliveryTypePage.selectDeliveryType()
    deliveryTypePage.enterLocation("Geetha Hospital Chaithanyapuri Main Road")
    deliveryTypePage.selectDeliveryLocationFromSuggetions()
    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")

    let menuPage = new MenuPage()
    menuPage.verifyDeliveryAddress('Pratap Nagar, Kothapet, Hyderabad')
    menuPage.verifyMenuHeaders('menuHeaders')

})

it("Verify Menu Item Details For Desserts",{tages:'smoke'}, ()=>{
    let homePage = new HomePage()
    homePage.clickOnOrderOnlineNow();
    
    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")
    let deliveryTypePage = new DeliveryTypePage()
    deliveryTypePage.selectDeliveryType()
    deliveryTypePage.enterLocation("Geetha Hospital Chaithanyapuri Main Road")
    deliveryTypePage.selectDeliveryLocationFromSuggetions()
    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")

    let menuPage = new MenuPage()
    menuPage.verifyDeliveryAddress('Pratap Nagar, Kothapet, Hyderabad')
    menuPage.verifyMenuItemDetails('desserts')
})

it('Add Products To Cart And Verify Item Details On MiniCart', ()=>{
    let homePage = new HomePage()
    homePage.clickOnOrderOnlineNow();
    
    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")
    let deliveryTypePage = new DeliveryTypePage()
    deliveryTypePage.selectDeliveryType()
    deliveryTypePage.enterLocation("Geetha Hospital Chaithanyapuri Main Road")
    deliveryTypePage.selectDeliveryLocationFromSuggetions()
    cy.verifyTitle("Domino's ZERO Contact Delivery - Great Taste, Delivered Safe")

    let menuPage = new MenuPage()
    menuPage.verifyDeliveryAddress('Pratap Nagar, Kothapet, Hyderabad')
    menuPage.addItemsToCartAndVerifyItemDetailsOnMiniCart('menuItems')
    menuPage.increaseQuantityAndVerifyItemDetailsOnMiniCart('menuItems')
    menuPage.decreaseQuantityAndVerifyItemDetailsOnMiniCart('menuItems')
    menuPage.clickOnCheckOutOnMiniCartAndVerifyItemDetailsOnCartPage()
})
})