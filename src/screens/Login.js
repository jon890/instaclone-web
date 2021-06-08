import {
  faFacebookSquare,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import AuthLayout from './components/auth/AuthLayout';
import BottomBox from './components/auth/BottomBox';
import FormBox from './components/auth/FormBox';
import FormError from './components/auth/FormError';
import Input from './components/auth/Input';
import Separator from './components/auth/Separator';
import SubmitButton from './components/auth/SubmitButton';
import PageTitle from './components/PageTitle';
import routes from './routes';
import { gql, useMutation } from '@apollo/client';
import { logUserIn } from '../apollo';
import { useLocation } from 'react-router';

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: #2ecc71;
`;

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      token
      error
    }
  }
`;

const Login = () => {
  const location = useLocation();
  console.log(location);

  const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: 'onChange',
    // mode: 'onBlur',
    defaultValues: {
      username: location?.state?.username || '',
      password: location?.state?.password || '',
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;

    if (!ok) {
      setError('result', {
        message: error,
      });
    }

    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmitValid = () => {
    if (loading) {
      return;
    }

    const { username, password } = getValues();
    login({
      variables: { username, password },
    });
  };

  const clearLoginError = () => {
    clearErrors('result');
  };

  return (
    <AuthLayout>
      <PageTitle title="Log in" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notification>{location?.state?.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input
            ref={register({
              required: 'Username is required',
              minLength: {
                value: 5,
                message: 'Username should be longer than 5 chars.',
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
            onChange={clearLoginError}
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />
          <Input
            ref={register({
              required: 'Password is required',
            })}
            name="password"
            type="password"
            placeholder="Password"
            onChange={clearLoginError}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />
          <SubmitButton
            type="submit"
            value={loading ? 'Loading...' : 'Log In'}
            disabled={!formState.isValid || loading}
          />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <FacebookLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>Log in with Facebook</span>
        </FacebookLogin>
      </FormBox>
      <BottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </AuthLayout>
  );
};

export default Login;
