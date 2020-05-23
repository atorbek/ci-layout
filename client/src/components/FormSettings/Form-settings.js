import React from 'react';
import { Field, reduxForm } from 'redux-form';
import './Form-settings.css';
import './_indentB/Form-settings_indentB_l.css';
import './_space/Form-settings_space_r.css';
import './Button/Form-settings-Button.css';
import FormItem from '../Form/Item/FormItem';
import Text from '../Text';
import Button from '../Button';
import { handleSaveSettings } from '../../modules/SettingsPage/SettingsPageActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LinkButton from '../ButtonLink';
import Form from '../Form/Form';
import FormInput from '../Form/Input/FormInput';
import { formNames } from '../../config';
import { useTranslation, Trans } from 'react-i18next';

const required = (value) => (value ? undefined : 'Required field!');

const normalizeNumber = (value, previousValue) => {
  const re = /^[1-9]\d*$/;
  return re.test(value) ? value : previousValue;
};

const renderField = ({ placeholder, meta: { touched, error }, ...rest }) => {
  return (
    <>
      <FormInput
        placeholder={touched && error ? error : placeholder}
        state={touched && error && 'alert'}
        {...rest}
      />
    </>
  );
};

const FormSettings = ({ handleSubmit, handleSaveSettings, submitting }) => {
  const { t } = useTranslation(['FormSettings']);

  const handleSaveSubmit = (e) => {
    handleSaveSettings(e);
  };

  return (
    <Form onSubmit={handleSubmit(handleSaveSubmit)} mix={['form-settings']}>
      <FormItem indentT="xs" mix={['form-settings_indentB_l']}>
        <Text tag="h2" size="l" lineHeight="xs" type="h2">
          {t('form.title')}
        </Text>
        <Text size="m" lineHeight="xxs" view="secondary">
          {t('form.description')}
        </Text>
      </FormItem>
      <FormItem
        indentT="xs"
        direction="column"
        mix={['form-settings_indentB_l']}
      >
        <Text size="m" lineHeight="xxs" type="span">
          {t('form.items.repoName.label')}
          <Text tag="span" view="alert">
            *
          </Text>
        </Text>
        <Field
          placeholder={t('form.items.repoName.placeholder')}
          name="repoName"
          component={renderField}
          validate={[required]}
        />
      </FormItem>
      <FormItem
        indentT="xs"
        direction="column"
        mix={['form-settings_indentB_l']}
      >
        <Text size="m" lineHeight="xxs" type="span">
          {t('form.items.buildCommand.label')}
          <Text tag="span" view="alert">
            *
          </Text>
        </Text>
        <Field
          placeholder={t('form.items.buildCommand.placeholder')}
          name="buildCommand"
          component={renderField}
          validate={[required]}
        />
      </FormItem>
      <FormItem
        indentT="xs"
        direction="column"
        mix={['form-settings_indentB_l']}
      >
        <Text size="m" lineHeight="xxs" type="span">
          {t('form.items.mainBranch.label')}
        </Text>

        <Field name="mainBranch" placeholder="master" component={renderField} />
      </FormItem>
      <FormItem indentB="xl" direction="row" verticalAlign="center">
        <Trans t={t} i18nKey="form.items.synchronize.label">
          <Text size="m" lineHeight="xxs" mix={['form-settings_space_r']}>
            Synchronize every
          </Text>
          <Field
            name="period"
            placeholder="10"
            type="text"
            component={renderField}
            normalize={normalizeNumber}
            mix={['form-settings_space_r', 'form-settings__input_number']}
          />
          <Text
            size="m"
            lineHeight="xxs"
            view="ghost"
            mix={['form-settings_space_r']}
          >
            minutes
          </Text>
        </Trans>
      </FormItem>
      <FormItem direction="row">
        <Button
          size="xxxxl"
          view="action"
          form="round"
          type="submit"
          disabled={submitting}
          mix={['form-settings__button', 'form-settings__button_type_save']}
        >
          {t('form.buttons.save')}
        </Button>
        <LinkButton
          to="/"
          size="xxxxl"
          view="control"
          form="round"
          disabled={submitting}
        >
          {t('form.buttons.cancel')}
        </LinkButton>
      </FormItem>
    </Form>
  );
};

const mapStateToProps = (state) => ({
  initialValues: { period: 1, ...state.settings.data }
});
const mapDispatchToProps = { handleSaveSettings };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formNames.formSettings,
    enableReinitialize: true
  })
)(FormSettings);
