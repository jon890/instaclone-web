import styled from 'styled-components';

const StyledFormError = styled.span`
  color: tomato;
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

function FormError({ message }) {
  if (!message || message === '') return null;

  return <StyledFormError>{message}</StyledFormError>;
}

export default FormError;
