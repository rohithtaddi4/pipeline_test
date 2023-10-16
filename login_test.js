const { I } = inject();

Feature('login of lambdaX').tag('@lambda-login').retry(2);

Before(() => {
    const startTime = new Date();
    console.log('Start Time is ' + startTime)
})

const loginPage = process.env.MY_URL
const invalidPassword = ".//*[@id = 'passwordError']"
const invalidEmail = ".//*[@id = 'emailError']"
const loginButton = ".//button[@id = 'loginSubmit']"
const home = "//a[@id= 'Home']"
const agreements = "//a[@id= 'Agreements']"
const analytics = "//a[@id= 'Analytics']"
const calendar = "//a[@id= 'Calendar']"
const configure = "//a[@id= 'Configure']"
const admin = "//a[@id= 'Admin']"

//methods
async function enterCredentials (email, password) { //
await I.amOnPage(loginPage)
await I.waitForVisible(locate('label').withAttr({id : 'emailLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'email' }), email)
await I.waitForVisible(locate('label').withAttr({id : 'passwordLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'password' }), password)
}

async function checkHomePage(){
    await I.seeElement(home)
    await I.seeElement(agreements)
    await I.seeElement(analytics)
    await I.seeElement(calendar)
    await I.seeElement(configure)
    await I.seeElement(admin)
  }

Scenario.skip('lambdaX::test-login-with-correct-credentials', async ({ I }) => {
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.click(loginButton)
    await I.wait(2)
    await I.refreshPage()
    await checkHomePage()
});

Scenario.skip('lambdaX::test-login-page-localss', async () => {
    await enterCredentials('TestUser@gmail.com', '•••••••')
    await I.click(loginButton)
    await I.waitForVisible(invalidMessage, 30)
});

Scenario('lambdaX::test-login-page-incorrect-email-formatss', async () => {
    await enterCredentials('TestUser', process.env.PASSWORD)
    await I.waitForVisible(invalidEmail, 30)
});

Scenario('lambdaX::test-login-page-empty-password-field', async () => {
    await enterCredentials(process.env.USER_NAME, '')
    const isButtonDisabled = await I.grabAttributeFrom(loginButton, 'disabled');
    if (isButtonDisabled === null) {
        throw new Error('Button is not disabled')
    }
});

Scenario('lambdaX::test-login-page-empty-email-field', async () => {
    await enterCredentials('', process.env.PASSWORD)
    const isButtonDisabled = await I.grabAttributeFrom(loginButton, 'disabled');
    if (isButtonDisabled === null) {
        throw new Error('Button is not disabled')
    }
});

Scenario.skip('lambdaX::test-login-page-incorrect-email-local', async () => {
    await enterCredentials('testuser@gmail.com', process.env.PASSWORD)
    await I.click(loginButton)
    await I.waitForVisible(invalidMessage, 30)
});

Scenario('lambdaX::test-login-page-incorrect-password', async () => {
    await enterCredentials(process.env.USER_NAME, '0000000Admin#')
    await I.click(loginButton)
   // await I.see('Invalid email or password')
});

Scenario('lambdaX::test-login-page-empty-credentials', async () => {
    await enterCredentials('', '')
    const isButtonDisabled = await I.grabAttributeFrom(loginButton, 'disabled');
    if (isButtonDisabled === null) {
        throw new Error('Button is not disabled')
    }
});

After(() => {
    const startTime = new Date();
    console.log('Start Time is ' + startTime)
})