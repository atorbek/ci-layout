module.exports = function (hermione) {
  hermione.on(hermione.events.NEW_BROWSER, function (browser) {
    browser.addCommand('waitForExistElement', (selector) => {
      return browser.waitUntil(
        () => {
          return browser.isExisting(selector);
        },
        300000,
        'Element not exist',
        500
      );
    });

    browser.addCommand('waitForVisibleElement', (selector) => {
      return browser.waitUntil(
        () => {
          return browser.isVisible(selector);
        },
        30000,
        'Element not visible',
        500
      );
    });
  });
};
