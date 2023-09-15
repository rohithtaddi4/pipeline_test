Feature('login').tag('@lambda-admin');

Before(()=> {
console.log('env var is')
console.log(process.env.MY_URL)
})

Scenario('test the admin', async  ({ I }) => {
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