/// <reference types="Cypress" />
import { faker } from '@faker-js/faker';
export default class User{

    elements = {
        resourcePath:"/public/v2/users",
        userId:""
    }

    createUserDetails(){
        let userDetails = {
            "name":faker.person.fullName(), 
            "gender":faker.person.sexType(), 
            "email":faker.internet.email(), 
            "status":faker.helpers.arrayElement(['active','inactive'])
        }
        return userDetails
    }

    createUser(payload){
        cy.POST_Request(this.elements.resourcePath,payload)
        .then((response)=>{
            expect(response.status).to.eq(201)
            expect(response.statusText).to.eq('Created')
            expect(response.body).to.have.property('name', payload.name)
            expect(response.body).to.have.property('gender', payload.gender)
            expect(response.body).to.have.property('email', payload.email)
            expect(response.body).to.have.property('status', payload.status)
            cy.writeFile('./cypress/fixtures/createUserResponce.json', response.body)
        })
    }

    getUser(testDataFileName){

        cy.fixture(testDataFileName).then((data)=>{
            cy.GET_Request(`${this.elements.resourcePath}/${data.id}`)
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.body).to.have.property('name', data.name)
                expect(response.body).to.have.property('gender', data.gender)
                expect(response.body).to.have.property('email', data.email)
                expect(response.body).to.have.property('status', data.status)
            
            })

        })
    }

    updateUser(testDataFileName, payload){
        cy.fixture(testDataFileName).then((data)=>{
            cy.PUT_Request(`${this.elements.resourcePath}/${data.id}`, payload)
            .then((response)=>{
                expect(response.status).to.eq(200)
                expect(response.statusText).to.eq('OK')
                expect(response.body.id).to.eq(data.id)
                expect(response.body.name).to.eq(payload.name)
                expect(response.body.gender).to.eq(payload.gender)
                expect(response.body.email).to.eq(payload.email)
                expect(response.body.status).to.eq(payload.status)
                cy.writeFile('./cypress/fixtures/updateUserResponce.json', response.body)
            })

        })

    }

    deleteUser(testDataFileName){
        cy.fixture(testDataFileName).then((data)=>{
            cy.DELETE_Request(`${this.elements.resourcePath}/${data.id}`)
            .then((response)=>{
                expect(response.status).to.eq(204)
                expect(response.statusText).to.eq('No Content')
            })
        })
    }

    verifyCreateUserErrorMessages(fixturePath){
        cy.fixture(fixturePath).then((data)=>{
            for(let i=0;i<data.length;i++){
                let userDetails={
                    "name": data[i].name,
                    "gender": data[i].gender ,
                    "email": data[i].email,
                    "status": data[i].status,
                }
                cy.POST_Request(this.elements.resourcePath, userDetails)
                .then((response)=>{
                    expect(response.status).to.eq(data[i].statusCode)
                    expect(response.statusText).to.eq(data[i].statusText)
                    expect(response.body[0].field).to.eq(data[i].field)
                    expect(response.body[0].message).to.eq(data[i].message)
                })
            }
        })
    }
}