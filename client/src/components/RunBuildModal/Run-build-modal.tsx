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
  InjectedFormProps
} from 'redux-form';
import FormInput, { ReduxFormProps } from '../Form/Input/FormInput';
import { useDispatch } from 'react-redux';
import LinkButton from '../ButtonLink/ButtonLink';
import ModalContent from '../Modal/Content/Modal-Content';
import Modal from '../Modal';
import RunBuildModalButton from './Button/Run-build-modal-Button';
import { formNames } from '../../config';
import {
  handleRunBuildAsync,
  useFormSelector
} from '../../modules/HistoryPage';

declare interface renderFieldProps {
  mix: string[];
}
const renderField: React.FC<renderFieldProps & ReduxFormProps> = ({
  input,
  name,
  placeholder,
  type,
  meta,
  mix,
  ...rest
}) => {
  const { touched, error } = meta;
  return (
    <>
      <FormInput
        input={input}
        name={name}
        placeholder={touched && error ? error : placeholder}
        type={type}
        state={touched && error && 'alert'}
        mix={mix}
        meta={meta}
        {...rest}
      />
    </>
  );
};

declare interface RunBuildModalProps {
  handleClickRunBuild: () => void;
}

type FormData = {
  commitHash: string;
};

const RunBuildModal: React.FC<
  InjectedFormProps<FormData, {}> & RunBuildModalProps
> = ({ handleSubmit, handleClickRunBuild, submitting }) => {
  const { error }: any = useFormSelector(
    getFormSubmitErrors(formNames.formRunBuildModal)
  );

  const dispatch = useDispatch();
  const handleClickSaveSubmit = ({ commitHash }: FormData): void => {
    dispatch(handleRunBuildAsync.request(commitHash));
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
              onClick={handleClickRunBuild}
              size="xxxxl"
              color="control"
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

export default reduxForm<FormData, RunBuildModalProps>({
  form: formNames.formRunBuildModal
})(RunBuildModal);
