import styled from 'styled-components';

const ConnectButton = styled.button`
  margin: 0 auto;
  background-color: darkgreen;
  color: white;
  width: 280px;
  height: 60px;
  font-size: 20px;
  margin-top: 100px;
  border-radius: 40px;
  &:hover {
    cursor: pointer;
  }
`;

export default ConnectButton;
export { ConnectButton };