import React from 'react';
import './Run-build-modal.css';
import '../Modal/Content/_space/Modal-Content_space_l.css';
import '../Modal/Content/_border/Modal-Content_border_all.css';
import Form from '../Form/Form';
import FormItem from '../Form/Item/FormItem';
import Text from '../Text';
import {
  Field,
  reduxForm,
  getFormSubmitErrors,
  hasSubmitSucceeded
} from 'redux-form';
import FormInput from '../Form/Input/FormInput';
import { compose } from 'redux';
import { connect } from 'react-redux';
import LinkButton from '../ButtonLink/ButtonLink';
import ModalContent from '../Modal/Content/Modal-Content';
import Modal from '../Modal';
import RunBuildModalButton from './Button/Run-build-modal-Button';
import { handleRunBuild } from '../../modules/HistoryPage';
import { formNames } from '../../config';

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

const RunBuildModal = ({
  handleSubmit,
  handleRunBuild,
  handleClickRunBuild,
  clearSubmitErrors,
  submitting,
  submitErrors,
  resetForm
}) => {
  const { error } = submitErrors;

  const handleClickSaveSubmit = (commitHash) => {
    clearSubmitErrors(formNames.formRunBuildModal);
    handleRunBuild(commitHash);
    resetForm();
  };

  const handleClickCancel = () => {
    handleClickRunBuild();
  };

  return (
    <Modal>
      <ModalContent mix={['run-build-modal']}>
        <Form onSubmit={handleSubmit(handleClickSaveSubmit)}>
          <FormItem direction="column" indentB="xl" indentT="xs">
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
            {error && (
              <Text tag="span" size="m" view="alert">
                Commit not found!
              </Text>
            )}
          </FormItem>
          <FormItem direction="row">
            <RunBuildModalButton
              size="xxxxl"
              view="action"
              form="round"
              type="submit"
              disabled={submitting}
            >
              Save
            </RunBuildModalButton>
            <LinkButton
              onClick={handleClickCancel}
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

const mapStateToProps = (state) => ({
  submitErrors: getFormSubmitErrors(formNames.formRunBuildModal)(state),
  submitSucceeded: hasSubmitSucceeded(formNames.formRunBuildModal)(state)
});
const mapDispatchToProps = {
  handleRunBuild
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  reduxForm({
    form: formNames.formRunBuildModal
  })
)(RunBuildModal);
