const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1280,
  viewportHeight: 720,

  env :{
    "baseUrl":"https://gorest.co.in",
    "url" : "https://www.dominos.co.in/",
    "authTocken":"1a5f3ef48555a85f3fdc606386b373ba7ae61d96b69cd6211ab4d7449ef969f8",
    snapshotOnly: true
  },
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    specPattern: 'cypress/**/*.cy.{js,jsx,ts,tsx}',
    watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
 
});
