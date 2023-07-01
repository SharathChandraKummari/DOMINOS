export default class HomePage{


    elements = {
        orderOnlineNow : ()=> cy.xpath("//button[text()='ORDER ONLINE NOW']")
    }

    clickOnOrderOnlineNow(){
        this.elements.orderOnlineNow().click()
    }
}