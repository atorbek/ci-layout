import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { createNumberMask } from 'redux-form-input-masks';
import './Form-settings.css';
import './_indentB/Form-settings_indentB_l.css';
import './_space/Form-settings_space_r.css';
import './Button/Form-settings-Button.css';
import { withNaming } from '@bem-react/classname';
import FormItem from '../Form/Item/FormItem';
import Text from '../Text';
import FormSettingsInput from './Input/FormSettingsInput';
import Button from '../Button';
import { handleSaveSettings } from '../../modules/SettingsPage/SettingsPageActions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LinkButton from '../ButtonLink';
const cn = withNaming({ e: '__', m: '_', v: '_' });

const required = (value) => (value ? undefined : 'Обязательное поле');
const number = (value) =>
  value && isNaN(Number(value)) ? 'Должно быть число' : undefined;

const numberMask = createNumberMask({
  locale: 'en-US',
  allowNegative: true
});

const renderField = ({
  input,
  name,
  placeholder,
  type,
  meta: { touched, error },
  mix
}) => {
  return (
    <>
      <FormSettingsInput
        input={input}
        name={name}
        placeholder={placeholder}
        type={type}
        state={touched && error && 'alert'}
        mix={mix}
      />
    </>
  );
};

const FormSettings = ({
  handleSubmit,
  handleSaveSettings,
  submitting,
  mix
}) => {
  const handleSaveSubmit = (e) => {
    handleSaveSettings(e);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSaveSubmit)}
      className={cn('form-settings')({}, mix)}
    >
      <FormItem indentT="xs" mix={['form-settings_indentB_l']}>
        <Text tag="h2" size="l" lineHeight="xs" type="h2">
          Settings
        </Text>
        <Text size="m" lineHeight="xxs" view="secondary">
          Configure repository connection and synshronization settings.
        </Text>
      </FormItem>
      <FormItem
        indentT="xs"
        direction="column"
        mix={['form-settings_indentB_l']}
      >
        <Text size="m" lineHeight="xxs" type="span">
          GitHub repository
          <Text tag="span" view="alert">
            *
          </Text>
        </Text>
        <Field
          name="repoName"
          placeholder="user-name/repo-name"
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
          Build command
          <Text tag="span" view="alert">
            *
          </Text>
        </Text>
        <Field
          name="buildCommand"
          placeholder="npm ci && npm run build"
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
          Main branch
        </Text>

        <Field name="mainBranch" placeholder="master" component={renderField} />
      </FormItem>
      <FormItem indentB="xl" direction="row" verticalAlign="center">
        <Text size="m" lineHeight="xxs" mix={['form-settings_space_r']}>
          Synchronize every
        </Text>
        <Field
          name="period"
          placeholder="10"
          value="10"
          type="text"
          component={renderField}
          validate={[number]}
          mix={['form-settings_space_r', 'form-settings__input_number']}
          {...numberMask}
        />
        <Text
          size="m"
          lineHeight="xxs"
          view="ghost"
          mix={['form-settings_space_r']}
        >
          minutes
        </Text>
      </FormItem>
      <FormItem direction="row">
        <Button
          size="xxxxl"
          view="action"
          form="round"
          type="submit"
          disabled={submitting}
          mix={['form-settings__button']}
        >
          Save
        </Button>
        <LinkButton
          to="/"
          size="xxxxl"
          view="control"
          form="round"
          disabled={submitting}
        >
          Cancel
        </LinkButton>
      </FormItem>
    </form>
  );
};

const mapStateToProps = (state) => ({
  initialValues: state.settings.data
});
const mapDispatchToProps = { handleSaveSettings };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'formSettings',
    enableReinitialize: true
  })
)(FormSettings);
