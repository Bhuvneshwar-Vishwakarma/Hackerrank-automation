const puppeteer = require("puppeteer");
const codeObj = require('./code')
const loginLink = "https://www.hackerrank.com/auth/login";
const email = "bhuvnesh8988@gmail.com";
const password = "Bhuvi@442002";
let browserOpen = puppeteer.launch({
  headless: false,
  args: ["--start-maximized"],
  defaultViewport: null,
});

let page;

browserOpen
  .then(function (browserObj) {
    let browserOpenPromise = browserObj.newPage();
    return browserOpenPromise;
  })
  .then(function (newTab) {
    page = newTab;
    let hackerrankOpenPromise = newTab.goto(loginLink);
    return hackerrankOpenPromise;
  })
  .then(function () {
    let emailIsEnter = page.type("input[id='input-1']", email, { delay: 50 });
    return emailIsEnter;
  })
  .then(function () {
    let passwordIsEnterd = page.type("input[type='password']", password, {
      delay: 50,
    });
    return passwordIsEnterd;
  })
  .then(function () {
    let loginButtonClicked = page.click("button[type='submit']");
    return loginButtonClicked;
  })
  .then(function () {
    let clickOnAlgoPromise = waitAndClick('a[data-attr2="algorithms"]', page);
    return clickOnAlgoPromise;
  })
  .then(function () {
    let getToWarmUp = waitAndClick('input[value="warmup"]', page);
    return getToWarmUp;
  }).then(function(){
    let waitFor3Second = page.waitFor(3000);
    return waitFor3Second
  }).then(function(){
    let allQuesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled' , {delay:50})
    return allQuesPromise;
  }).then(function(questionsArr){
    console.log("Number of Questions ", questionsArr.length);
    let questionWillBeSolved = questionSolver(page, questionsArr[0], codeObj.answer[0]);
    return questionWillBeSolved;
  })

function waitAndClick(selector, cPage) {
  return new Promise(function (resolve, reject) {
    let waitForModelPromise = cPage.waitForSelector(selector);
    waitForModelPromise
      .then(function () {
        let clickModal = cPage.click(selector);
        return clickModal;
      })
      .then(function () {
        resolve();
      })
      .catch(function (err) {
        reject();
      });
  });
}

function questionSolver( page, question, answer ){
  return new Promise(function (resolve, reject){
    let questionwillBeClicked = question.click();
    questionwillBeClicked.then(function() {
      let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs', page)
      return EditorInFocusPromise
    }).then(function() {
      return waitAndClick('.checkbox-input', page)
    }).then(function() {
      return page.waitForSelector('textarea.custominput', page);
    }).then(function(){
      return page.type('textarea.custominput', answer, {delay:10})
    }).then(function(){
      let ctrlIsPressed = page.keyboard.down('Control')
      return ctrlIsPressed
    }).then(function(){
      let aIsPressed = page.keyboard.press('A', {delay:100})
      return aIsPressed
    }).then(function() {
      let xIsPressed = page.keyboard.press('X', {delay: 100})
      return xIsPressed
    }).then(function(){
      let ctrlIsUnPressed = page.keyboard.up('Control')
      return ctrlIsUnPressed
    }).then(function(){
      let mainEditorFocus = waitAndClick('.monaco-editor.no-user-select.vs', page);
      return mainEditorFocus
    }).then(function(){
      let ctrlIsPressed = page.keyboard.down('Control')
      return ctrlIsPressed
    }).then(function(){
      let aIsPressed = page.keyboard.press('A', {delay:100})
      return aIsPressed
    }).then(function(){
      let vIsPressed = page.keyboard.press('V', {delay:100})
      return vIsPressed
    }).then(function(){
      let ctrlIsUnPressed = page.keyboard.up('Control')
      return ctrlIsUnPressed
    }).then(function(){
      return page.click('.hr-monaco__run-code', {delay:50})
    }).then(function(){
      resolve();
    }).catch(function(err){
      reject();
    })
  })
}