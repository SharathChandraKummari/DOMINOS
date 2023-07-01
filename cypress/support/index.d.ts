declare namespace Cypress {
    interface Chainable {
        GET_Request(resourcePath:any):Cypress.Chainable<JQuery>;
        POST_Request(resourcePath:any,payLoad:any):Cypress.Chainable<JQuery>;
        PUT_Request(resourcePath:any,payLoad:any):Cypress.Chainable<ApiResponseBody>;
        DELETE_Request(resourcePath:any):Cypress.Chainable<ApiResponseBody>;
        CloseBannerIfPresent():Cypress.Chainable<ApiResponseBody>;
    }
}