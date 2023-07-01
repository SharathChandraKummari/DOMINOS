/// <reference types="Cypress" />
export default class CartPage{

    elements = {
        cart_ItemTitle : ()=> cy.xpath('//div[@class="cart-item"]//span[@class="item--ttl"]'),
        cart_ItemPrice : ()=> cy.xpath('//div[@class="cart-item"]//span[@class="rupee"]'),
        cart_ItemQuantity : ()=>cy.xpath('//span[@class="cntr-val"]'),
        cartSubTotal : ()=> cy.xpath('//span[text()="Sub Total"]/following-sibling::span/span')
    }

    verifyItemDetailsOnCart(cartItems, cartTotal){
        let itemName = Object.keys(cartItems)
        let itemPrice = Object.values(cartItems)
        this.elements.cart_ItemTitle().each((ele,index)=>{
            cy.wrap(ele).should('have.text',itemName[index])
            this.elements.cart_ItemPrice().eq(index).should('have.text'," "+itemPrice[index]+'.00')
        })
        this.elements.cartSubTotal().should('have.text', cartTotal['Total']+'.00')
    }
}