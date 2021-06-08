import { useMutation } from '@apollo/client';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import AuthLayout from './components/auth/AuthLayout';
import BottomBox from './components/auth/BottomBox';
import FormBox from './components/auth/FormBox';
import FormError from './components/auth/FormError';
import Input from './components/auth/Input';
import SubmitButton from './components/auth/SubmitButton';
import PageTitle from './components/PageTitle';
import { FatLink } from './components/shared';
import routes from './routes';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubTitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();

  const onCompleted = (data) => {
    const {
      createAccount: { ok, error },
    } = data;

    if (!ok) {
      setError('result', error);
      return;
    }

    const { username, password } = getValues();

    history.push(routes.home, {
      message: 'Account created. Please log in.',
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    errors,
    formState,
    setError,
    clearErrors,
    getValues,
  } = useForm({
    mode: 'onChange',
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }

    createAccount({
      variables: {
        ...data,
      },
    });
  };

  const clearSignUpError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title="Sign up" />
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <SubTitle>
            Sign up to see photos and videos from your friends.
          </SubTitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              require: 'First name is required.',
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
            onChange={clearSignUpError}
            hasError={Boolean(errors?.firstName?.message)}
          />
          <FormError message={errors?.firstName?.message} />
          <Input
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last Name"
            onChange={clearSignUpError}
            hasError={Boolean(errors?.lastName?.message)}
          />
          <FormError message={errors?.lastName?.message} />
          <Input
            ref={register({
              require: 'Email is required.',
            })}
            name="email"
            type="text"
            placeholder="Email"
            onChange={clearSignUpError}
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            ref={register({
              require: 'Username is required.',
            })}
            name="username"
            type="text"
            placeholder="Username"
            onChange={clearSignUpError}
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              require: 'Password is required.',
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={clearSignUpError}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <SubmitButton
            type="submit"
            value={loading ? 'Loading...' : 'Sign In'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </AuthLayout>
  );
};

export default SignUp;
