/// <reference types="Cypress" />

import CartPage from "./cartPage"

export default class MenuPage{

    elements = {
        deliveryAddress : ()=>cy.xpath('//div[@class="slct-lctn-txt slct-lctn-txt-slctd"]', {timeout:6000}),
        menuHeaders : ()=> cy.xpath('//div[@class="mn-hdr hide" or @class="mn-hdr active"]//span'),
        menuHeader : (menuTitle) => cy.xpath(`//div[@class="mn-hdr hide" or @class="mn-hdr active"]//span[text()="${menuTitle}"]`,{timeout:10000}),
        itemName : (itemCategory) => cy.xpath(`//div[@class="menu-left"]//div[@data-label="${itemCategory}"]//span[@class='itm-dsc__nm']`),
        itemPrice : (itemCategory) => cy.xpath(`//div[@class='menu-left']//div[@data-label="${itemCategory}"]//span[@class='rupee']`),
        itemAddtoCart : (itemCategory, itemName) => cy.xpath(`//div[@class="menu-left"]//div[@data-label="${itemCategory}"]//span[text()="${itemName}"]/parent::div/following-sibling::div[@class="itm-dsc__actn__adCrt"]//span[text()="ADD TO CART"]`,{timeout:5000}),
        noThanks : ()=> cy.xpath('//span[text()="NO THANKS"]',{timeout:3000}),
        miniCrtItemTitle : ()=> cy.xpath('//span[@class="crt-cnt-descrptn-ttl"]'),
        miniCrtItemPrice : () => cy.xpath('//span[@class="crt-cnt-qty-prc-txt"]'),
        increaseQuantity : (itemCategory, itemName) => cy.xpath(`//div[@class="menu-left"]//div[@data-label="${itemCategory}"]//span[text()="${itemName}"]/parent::div/following-sibling::div[@class="itm-dsc__actn__adCrt"]//div[@data-label="increase"]`),
        decreaseQuantity : (itemCategory, itemName) => cy.xpath(`//div[@class="menu-left"]//div[@data-label="${itemCategory}"]//span[text()="${itemName}"]/parent::div/following-sibling::div[@class="itm-dsc__actn__adCrt"]//div[@data-label="decrease"]`),
        miniCartTotal : ()=>cy.get('span.rupee.sb-ttl'),
        miniCart_CheckOut : ()=>cy.xpath('//span[text()="CHECKOUT"]')
    }

    cartItems = {

    }

    cartTotal = { Total:0

    }

    verifyDeliveryAddress(address){

        //remove invoke
        this.elements.deliveryAddress().invoke('text').should('eql', address)
    }

    verifyMenuHeaders(menuHeadersFixturePath){
        cy.fixture(menuHeadersFixturePath).then((data)=>{
        this.elements.menuHeaders().its('length').should('eql', data.menuHeaders.length)
            this.elements.menuHeaders().each((header, index)=>{
                cy.wrap(header).should('have.text', data.menuHeaders[index] )
            })
        })
    }

    verifyMenuItemDetails(menuItemsFixturePath){
        cy.fixture(menuItemsFixturePath).then((data)=>{
            
            for(let i=0;i<data.menuItems.length;i++){

                this.elements.menuHeader(data.menuItems[i].itemCategory.toUpperCase()).click()
                        this.elements.itemName(data.menuItems[i].itemCategory).each((item,index)=>{
                             cy.wrap(item).should('have.text',data.menuItems[i].items[index].itemName)
                             this.elements.itemPrice(data.menuItems[i].itemCategory).eq(index).should('have.text', data.menuItems[i].items[index].itemPrice)
                        })
            }
        })
    }

    addItemsToCartAndVerifyItemDetailsOnMiniCart(menuItemsFixturePath){
        cy.fixture(menuItemsFixturePath).then((data)=>{

            for(let i=0;i<data.menuItems.length;i++){
                cy.CloseBannerIfPresent()
                this.elements.menuHeader(data.menuItems[i].itemCategory.toUpperCase()).click( {force: true})
                for(let j=0;j<data.menuItems[i].items.length;j++){
                    var key = data.menuItems[i].items[j].itemName
                    var value = data.menuItems[i].items[j].itemPrice
                    this.addData(key, value)
                    cy.CloseBannerIfPresent()
                    this.elements.itemAddtoCart(data.menuItems[i].itemCategory,data.menuItems[i].items[j].itemName).click( {force: true})
                    cy.get('body').then((body)=>{
                        if(body.find('.btn--gry').length>0){
                            cy.CloseBannerIfPresent()
                            cy.contains('NO THANKS').click( {force: true})
                        }
                    })
                }
        }
        }).then(()=>{
            this.verifyItemsOnCart()
        })
    }

    addData(key, value){
        this.cartItems [key] = value
        this.cartTotal['Total'] = this.cartTotal['Total'] + parseInt(value)
        return new Promise(function (resolve, reject) {
            resolve('Hello World!')
          })
    }

    verifyItemsOnCart(){

        let itemName = Object.keys(this.cartItems)
        let itemPrice = Object.values(this.cartItems)
        this.elements.miniCrtItemTitle().each((ele,index)=>{
            cy.wrap(ele).should('have.text',itemName[index])
            this.elements.miniCrtItemPrice().eq(index).should('have.text',itemPrice[index]+'.00')
        })
        this.elements.miniCartTotal().should('have.text', this.cartTotal['Total']+'.00')
    }

    increaseQuantityAndVerifyItemDetailsOnMiniCart(menuItemsFixturePath){
        cy.fixture(menuItemsFixturePath).then((data)=>{

            for(let i=0;i<data.menuItems.length;i++){
                this.elements.menuHeader(data.menuItems[i].itemCategory.toUpperCase()).click( {force: true})
                for(let j=0;j<data.menuItems[i].items.length;j++){
                    for(let q=1;q<data.menuItems[i].items[j].itemQty;q++){
                        var key = data.menuItems[i].items[j].itemName
                        var value = data.menuItems[i].items[j].itemPrice
                        this.elements.increaseQuantity(data.menuItems[i].itemCategory,data.menuItems[i].items[j].itemName).click( {force: true})
                        this.increasePrice(key,value)
                    }
                    
                }
        }

        }).then(()=>{
            this.verifyItemsOnCart()
        })
    }

    increasePrice(key, value){        
        this.cartItems[key] =  parseInt(this.cartItems[key])+parseInt(value)
        this.cartTotal['Total'] = this.cartTotal['Total']+ parseInt(value)
        return new Promise(function (resolve, reject) {
            resolve('Hello World!')
          })
    }

    decreaseQuantityAndVerifyItemDetailsOnMiniCart(menuItemsFixturePath){
        cy.fixture(menuItemsFixturePath).then((data)=>{

            for(let i=0;i<data.menuItems.length;i++){
                this.elements.menuHeader(data.menuItems[i].itemCategory.toUpperCase()).click( {force: true})
                for(let j=0;j<data.menuItems[i].items.length;j++){
                    for(let q=1;q<=data.menuItems[i].items[j].decQty;q++){
                        var key = data.menuItems[i].items[j].itemName
                        var value = data.menuItems[i].items[j].itemPrice
                        this.elements.decreaseQuantity(data.menuItems[i].itemCategory,data.menuItems[i].items[j].itemName).click( {force: true})
                        this.decreasePrice(key,value)
                    }
                    
                }
        }

        }).then(()=>{
            this.verifyItemsOnCart()
        })
    }

    decreasePrice(key, value){        
        this.cartItems[key] =  parseInt(this.cartItems[key])-parseInt(value)
        this.cartTotal['Total'] = this.cartTotal['Total'] - parseInt(value)
        return new Promise(function (resolve, reject) {
            resolve('Hello World!')
          })
    }

    verifyItemDetailsOnCart(){
        let itemName = Object.keys(this.cartItems)
        let itemPrice = Object.values(this.cartItems)
        this.elements.cart_ItemTitle().each((ele,index)=>{
            cy.wrap(ele).should('have.text',itemName[index])
            this.elements.cart_ItemPrice().eq(index).should('have.text',itemPrice[index]+'.00')
        })
        this.elements.cartSubTotal().should('have.text', this.cartTotal['Total']+'.00')
    }

    clickOnCheckOutOnMiniCartAndVerifyItemDetailsOnCartPage(){
        this.elements.miniCart_CheckOut().click()
        .then(()=>{
            let cartPage = new CartPage()
            cartPage.verifyItemDetailsOnCart(this.cartItems, this.cartTotal)
        })
    }
}