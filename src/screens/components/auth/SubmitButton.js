import styled from 'styled-components';

const StyledButton = styled.input`
  width: 100%;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
`;

export default StyledButton;
