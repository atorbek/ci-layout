describe('testClass', () => {
  it('test', () => {
    return this.browser
      .url('http://localhost:8080')
      .click('.header__button')
      .waitForVisible('.modal__content ');
  });
});
