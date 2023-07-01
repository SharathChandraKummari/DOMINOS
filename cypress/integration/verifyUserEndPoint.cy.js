import User from '../support/endPoints/user.js'

const userAPI = new User()
describe('User Endpoint Suit', () => {


    it('Create User', () => {
        userAPI.createUser(userAPI.createUserDetails())
    })

    it('Get User', () => {
        userAPI.getUser('createUserResponce')       
    })

    it('Update User',()=>{

        userAPI.updateUser('createUserResponce', userAPI.createUserDetails())
    })

    it('Get Updated User', ()=>{

        userAPI.getUser('updateUserResponce')
    })

    it('Delete User', ()=>{

       userAPI.deleteUser('updateUserResponce')
    })

    it('Verify Create User Error Messages',()=>{

        userAPI.verifyCreateUserErrorMessages('userErrors')
    })

})