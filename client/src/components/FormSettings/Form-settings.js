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

const required = (value) => (value ? undefined : 'Обязательное поле');

const normalizeNumber = (value, previousValue) => {
  const re = /^[1-9]\d*$/;
  return re.test(value) ? value : previousValue;
};

const renderField = ({
  input,
  name,
  placeholder,
  type,
  meta: { touched, error },
  mix,
  ...rest
}) => {
  return (
    <>
      <FormInput
        input={input}
        name={name}
        placeholder={touched && error ? error : placeholder}
        type={type}
        state={touched && error && 'alert'}
        mix={mix}
        {...rest}
      />
    </>
  );
};

const FormSettings = ({ handleSubmit, handleSaveSettings, submitting }) => {
  const handleSaveSubmit = (e) => {
    handleSaveSettings(e);
  };

  return (
    <Form onSubmit={handleSubmit(handleSaveSubmit)} mix={['form-settings']}>
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
