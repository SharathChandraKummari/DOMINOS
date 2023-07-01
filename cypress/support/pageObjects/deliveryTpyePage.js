/// <reference types="Cypress" />

export default class DeliveryTypePage{

    elements = {
        delivry : ()=> cy.xpath('//input[@placeholder="Enter your delivery address"]',{timeout:8000 }),
        location : ()=> cy.xpath('//input[@placeholder="Enter Area / Locality"]',{timeout:8000 }),
        suggestion : ()=> cy.xpath('//div[@class="lst-wrpr"]//span[text()="Geetha Hospital"]', {timeout:8000 })
    }

    selectDeliveryType(){

        this.elements.delivry().click()
    }

    enterLocation(location){
        cy.CloseBannerIfPresent()
        this.elements.location().type(location)
    }

    selectDeliveryLocationFromSuggetions(){
        cy.CloseBannerIfPresent()
        this.elements.suggestion().each((ele)=>{
            cy.wrap(ele).contains('Geetha Hospital', {timeout:6000}).click( {force: true})
        })

    }

}