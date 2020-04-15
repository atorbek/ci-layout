const assert = require('chai').assert;

describe('Страница настройки - /settings', function () {
  describe('Валидация формы settings', function () {
    it('Если не заполнить GitHub repository и сохранить форму в поле ошибка', async function () {
      const b = this.browser;
      await b
        .url('/settings')
        .waitForExistElement('.form-settings__button_type_save')
        .click('.form-settings__button_type_save');
      const repoName = b.$('input[name="repoName"]');

      return assert.equal(
        await repoName.getAttribute('placeholder'),
        'Обязательное поле'
      );
    });

    it('Если не заполнить Build command и сохранить форму в поле ошибка', async function () {
      const b = this.browser;
      await b
        .url('/settings')
        .waitForExistElement('.form-settings__button_type_save')
        .click('.form-settings__button_type_save');
      const buildCommand = b.$('input[name="buildCommand"]');

      return assert.equal(
        await buildCommand.getAttribute('placeholder'),
        'Обязательное поле'
      );
    });

    it('Synchronize every игнорирует ввод отрицательных чисел', async function () {
      const periodSelector = 'input[name="period"]';
      const b = this.browser;
      await b.url('/settings').waitForExistElement(periodSelector);
      const period = b.$(periodSelector);
      await period.setValue('-2');
      const value = await b.$(periodSelector).getValue();
      return assert.equal(value, 12);
    });

    it('Synchronize every игнорирует ввод букв', async function () {
      const periodSelector = 'input[name="period"]';
      const b = this.browser;
      await b.url('/settings').waitForExistElement(periodSelector);
      const period = b.$(periodSelector);
      await period.setValue('test');
      const value = await b.$(periodSelector).getValue();
      return assert.equal(value, 1);
    });
  });
});
