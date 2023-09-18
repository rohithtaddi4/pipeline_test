const { I } = inject();

Feature('Admin section of lambdaX').tag('@lambda-admin').retry(2);

 let userData = {
    firstName : 'Test', 
    lastName : 'Automation',
    eMail : 'testautomationuser@gmail.com',
    group : 'LambdaX Managers',
    phNumber : '911111111111'
}

const loginPage = process.env.MY_URL
const adminOption = '//a[@id= "Admin"]'
const users = '//a[@id= "Users"]'
const userGroups = '//a[@id= "User Groups"]'
const managers = '//*[text()= "LambdaX Managers"]'
const admin = '//td[text()= "Admin"]'
const permissions = '//*[@id="Permissions"]'
const close = '//button[@aria-label="Close"]'
const confirm = '//button[text()="Confirm"]'
const missingFname = '//*[@id="mfirstNameError"]'
const missingLname = '//*[@id="mlastNameError"]'
const missingEmail = '//*[@id="memailError"]'
const missingGroup = '//*[@id="muserGrouperror"]'
const missingPh = '//*[@id="phoneNumberError"]'
const invalidEmail = '//*[@id="memailError"]' ///
const invalidPh = '//*[@id="phoneNumberError"]'//

// insert your methods here
async function enterCredentials(email, password) {
await I.amOnPage(loginPage)
await I.waitForVisible(locate('label').withAttr({id : 'emailLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'email' }), email)
await I.waitForVisible(locate('label').withAttr({id : 'passwordLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'password' }), password)
await I.click(locate('button').withAttr({id: 'loginSubmit'}))
}

async function createUser(userData){
await I.waitForVisible(locate('button').withAttr({id : 'adminCreateUser'}), 30)
await I.click(locate('button').withAttr({id : 'adminCreateUser'})) 
await I.waitForVisible(locate('h1').withText('New User'), 30)
await I.waitForVisible(locate('label').withAttr({id : 'mfirstNameLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'mfirstName' }), userData.firstName)
await I.waitForVisible(locate('label').withAttr({id : 'mlastNameLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'mlastName' }), userData.lastName)
await I.waitForVisible(locate('label').withAttr({id : 'memailLabel'}), 30)
await I.fillField(locate('input').withAttr({ id: 'memail' }), userData.eMail)
await I.waitForVisible(locate('p').withAttr({id: 'muserGroupp'}), 30)
await I.click(".//*[@id = 'muserGroup']//input")
await I.wait(1)
await I.waitForVisible("//*[text()='LambdaX Managers']", 30)
await I.click("//*[text()='LambdaX Managers']")
await I.pressKey('Enter')
await I.waitForVisible(locate('label').withAttr({id : 'mPhone'}), 30)
await I.fillField(locate('input').withAttr({ placeholder: 'Enter Number' }), userData.phNumber)
await I.click(".//*[@id='mCreateUser']")
}

async function verifyUser(){
await I.waitForVisible(locate('input').withAttr({id: 'adminSearch'}), 30)
await I.click(locate('input').withAttr({id: 'adminSearch'}))
await I.type('testautomationuser@gmail.com')
await I.pressKey('Enter')
await I.waitForVisible(locate('td').withText('Test'))
await I.waitForVisible(locate('td').withText('Automation'))
await I.waitForVisible(locate('td').withText('testautomationuser@gmail.com'))
}

async function deleteUsers(user){
await I.clearField(locate('input').withAttr({id: 'adminSearch'}))
await I.waitForVisible(locate('input').withAttr({id: 'adminSearch'}), 30)
await I.click(locate('input').withAttr({id: 'adminSearch'}))
await I.type(user)
await I.pressKey('Enter')
await I.waitForVisible(locate('td').withText('testautomationuser@gmail.com'))
await I.click(locate('td').withText('testautomationuser@gmail.com'))
//await I.click(`.//*[contains(., '${user}')]//parent::tr`)
await I.click(locate('button').withAttr({id : 'deleteUser'}))
await I.click(locate('button').withAttr({id : 'mDelete'}))
await I.waitForVisible(locate('span').withText('User Deleted'), 30)
}

Before( async () => {
    const startTime = new Date();
    console.log('Start Time is ' + startTime)
})

let deleteUser

Scenario('lambdaX::test-admin-create-users-with-valid-data', async () => {
    deleteUser = true
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await verifyUser()
    await I.waitForVisible(userGroups, 30)
    await I.click(userGroups)
    await I.waitForVisible(managers, 30)
    await I.click(managers)
    await verifyUser()
    await I.click(users) 
    await verifyUser()
    await deleteUsers(userData.eMail)
    deleteUser = false
});

Scenario('lambdaX::test-admin-user-creation-with-existed-email', async () => {
    deleteUser = true
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.wait(2)
    await createUser(userData)
   // await I.waitForVisible(locate('*').withText(`A user with email ${userData.eMail} already exists`))
    await I.click(close)
    await I.click(confirm)
    await deleteUsers(userData.eMail)
    deleteUser = false
});

Scenario('lambdaX::test-admin-create-users-with-missing-firstName', async () => {
    userData.firstName = ''
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(missingFname)
    userData.firstName = 'Test'
});

Scenario('lambdaX::test-admin-create-users-with-missing-lastname', async () => {
    userData.lastName = ''
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(missingLname)
    userData.lastName = 'Automation'
});

Scenario('lambdaX::test-admin-create-users-with-missing-email', async () => {
    userData.eMail = ''
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(missingEmail)
    userData.eMail = 'testautomationuser@gmail.com'
});

Scenario('lambdaX::test-admin-create-users-with-missing-usergroup', async () => {
    userData.group = ''
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(missingGroup)
    userData.group = 'LambdaX Managers'
});

Scenario('lambdaX::test-admin-create-users-with-missing-phonenumber', async () => {
    userData.phNumber = ''
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(missingPh)
    userData.phNumber = '911111111111'
});

Scenario('lambdaX::test-admin-create-users-with-invalid-email-format', async () => {
    userData.eMail = 'testautomationuser#gmail.com'
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(invalidEmail)
    userData.eMail = 'testautomationuser@gmail.com'
});

Scenario('lambdaX::test-admin-create-users-with-invalid-phone-format', async () => {
    userData.phNumber = '010101010101'
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await I.waitForVisible(adminOption, 30)
    await I.click(adminOption)
    await I.waitForVisible(users, 30)
    await I.click(users)
    await createUser(userData)
    await I.seeElement(invalidPh)
    userData.phNumber = '911111111111'
});

Scenario.skip('lambdaX::test-admin-section-admin-permissions', async () => {
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await checkRolePermissions('Admin')
    let data = await I.grabTextFrom("//p[text() = 'User Groups']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Team Roles']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Create Agreements']//parent::div/div")
    await validateAsset(data, 'Yes')
    data = await I.grabTextFrom("//p[text() = 'View Agreements']//parent::div/div")
    await validateAsset(data, 'All')
    data = await I.grabTextFrom("//p[text() = 'Users']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Home Page Dashboard']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Master Data']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Global Search']//parent::div/div")
    await validateAsset(data, 'Yes')
    data = await I.grabTextFrom("//p[text() = 'Agreement Configuration']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Field Configuration']//parent::div/div")
    await validateAsset(data, 'Manage')
});

Scenario.skip('lambdaX::test-admin-section-lambdaX-managers-permissions', async () => {
    await enterCredentials(process.env.USER_NAME, process.env.PASSWORD)
    await checkRolePermissions('LambdaX Managers')
    let data = await I.grabTextFrom("//p[text() = 'User Groups']//parent::div/div")
    await validateAsset(data, 'View Only') 
    data = await I.grabTextFrom("//p[text() = 'Team Roles']//parent::div/div")
    await validateAsset(data, 'View Only')
    data = await I.grabTextFrom("//p[text() = 'Create Agreements']//parent::div/div")
    await validateAsset(data, 'Yes')
    data = await I.grabTextFrom("//p[text() = 'View Agreements']//parent::div/div")
    await validateAsset(data, 'Only if they are a member')
    data = await I.grabTextFrom("//p[text() = 'Users']//parent::div/div")
    await validateAsset(data, 'View Only')
    data = await I.grabTextFrom("//p[text() = 'Home Page Dashboard']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Master Data']//parent::div/div")
    await validateAsset(data, 'Manage')
    data = await I.grabTextFrom("//p[text() = 'Global Search']//parent::div/div")
    await validateAsset(data, 'Yes')
    data = await I.grabTextFrom("//p[text() = 'Agreement Configuration']//parent::div/div")
    await validateAsset(data, 'View Only')
    data = await I.grabTextFrom("//p[text() = 'Field Configuration']//parent::div/div")
    await validateAsset(data, 'View Only')
});


After(async () => {
    const endTime = new Date();
    console.log('End Time is ' + endTime)
  if(deleteUser){
    await I.amOnPage(process.env.ADMIN_URL)
    await I.clearField(locate('input').withAttr({id: 'adminSearch'}))
    await I.waitForVisible(locate('input').withAttr({id: 'adminSearch'}), 30)
    await I.click(locate('input').withAttr({id: 'adminSearch'}))
    await I.type('testautomationuser@gmail.com')
    await I.pressKey('Enter')
    await I.waitForVisible(locate('td').withText('testautomationuser@gmail.com'))
    await I.click(locate('td').withText('testautomationuser@gmail.com'))
    //await I.click(`.//*[contains(., '${user}')]//parent::tr`)
    await I.click(locate('button').withAttr({id : 'deleteUser'}))
    await I.click(locate('button').withAttr({id : 'mDelete'}))
    await I.waitForVisible(locate('span').withText('User Deleted'))
  }
  userData = {
    firstName : 'Test', 
    lastName : 'Automation',
    eMail : 'testautomationuser@gmail.com',
    group : 'LambdaX Managers',
    phNumber : '911111111111'
}
})