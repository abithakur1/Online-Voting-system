import React from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Wrapper = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  z-index: 999;
  background-color: rgba(255, 200, 200, 0.5);
  justify-content: center;
  align-items: center;
`;

export const ErrorScreen = () => (
  <Wrapper>
    <Text>ERROR!!!</Text>
  </Wrapper>
);
