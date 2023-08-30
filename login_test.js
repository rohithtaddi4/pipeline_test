Feature('login');

Before(()=> {
console.log('env var is')
console.log(process.env.MY_URL)
})

Scenario('test something',  ({ I }) => {
    console.log('env var is')
  I.amOnPage('https://codecept.io/playwright/#setup')
  console.log(process.env.MY_URL)

});

After(()=> {
    console.log('env var is')
    console.log(process.env.MY_URL)

})