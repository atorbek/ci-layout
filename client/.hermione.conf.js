module.exports = {
  baseUrl: 'http://localhost:3000',
  sets: {
    desktop: {
      files: 'src/**/*.hermione.js'
    }
  },

  browsers: {
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome'
      }
    }
  },

  windowSize: {
    width: 1366,
    height: 768
  },

  plugins: {
    'hermione-wdio-utility-wrap-plugin': true
  }
};
