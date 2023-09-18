Feature('login').tag('@lambda-login');

Before(()=> {
console.log('env var is')
console.log(process.env.MY_URL)
})

// action.js

const core = require('@actions/core');

async function run() {
  try {
    const customName = core.getInput('custom-name');
    console.log(`::set-output name=workflow_name::${customName}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();


Scenario('test the login', async  ({ I }) => {
    await I.amOnPage(process.env.MY_URL)
    await I.waitForVisible(locate('label').withAttr({id : 'emailLabel'}), 30)
    await I.fillField(locate('input').withAttr({ id: 'email' }), process.env.USER_NAME)
    await I.waitForVisible(locate('label').withAttr({id : 'passwordLabel'}), 30)
    await I.fillField(locate('input').withAttr({ id: 'password' }), process.env.PASSWORD)
    await I.click(".//button[@id = 'loginSubmit']")
    await I.waitForVisible("//a[@id= 'Home']", 30)
});

After(()=> {
    console.log('env var is')
    console.log(process.env.MY_URL)

})