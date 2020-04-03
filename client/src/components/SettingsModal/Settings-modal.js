import React from 'react';
import './Settings-modal.css';
import '../Modal/Content/_space/Modal-Content_space_l.css';
import '../Modal/Content/_border/Modal-Content_border_all.css';
import Form from '../Form/Form';
import FormItem from '../Form/Item/FormItem';
import Text from '../Text';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../Form/Input/FormInput';
import { handleSaveSettings } from '../../modules/SettingsPage/SettingsPageActions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LinkButton from '../ButtonLink/ButtonLink';
import ModalContent from '../Modal/Content/Modal-Content';
import Modal from '../Modal';
import SettingsModalButton from './Button/SettingsModal-Button';

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

const SettingsModal = ({ handleSubmit, submitting }) => {
  const handleSaveSubmit = (e) => {};

  const handleCancel = (e) => {};

  return (
    <Modal>
      <ModalContent mix={['settings-modal']}>
        <Form onSubmit={handleSubmit(handleSaveSubmit)}>
          <FormItem
            direction="column"
            indentB="xl"
            indentT="xs"
            mix={['settings__modal']}
          >
            <Text tag="h2" size="l" lineHeight="xs" type="h2">
              New build
            </Text>
            <Text size="m" lineHeight="xxs" view="secondary">
              Enter the commit hash which you want to build
            </Text>
            <Field
              name="commitHash"
              placeholder="Commit hash"
              component={renderField}
            />
          </FormItem>
          <FormItem direction="row">
            <SettingsModalButton
              size="xxxxl"
              view="action"
              form="round"
              type="submit"
              disabled={submitting}
            >
              Save
            </SettingsModalButton>
            <LinkButton
              onClick={handleCancel}
              size="xxxxl"
              view="control"
              form="round"
              disabled={submitting}
            >
              Cancel
            </LinkButton>
          </FormItem>
        </Form>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = () => ({});
const mapDispatchToProps = { handleSaveSettings };

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: 'settingsModal'
  })
)(SettingsModal);
