import React from 'react';
import styled from 'styled-components/native';
import DocumentIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import { useNavigation } from '@react-navigation/core';
import DownloadIcon from '@democracy-deutschland/mobile-ui/src/components/Icons/Download';
import { linking } from '../../../../lib/linking';

const Container = styled.View`
  flex-direction: row;
`;

const ViewerButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-top: 18px;
`;

const Text = styled.Text`
  padding-left: 14px;
  font-size: 13px;
  color: rgb(0, 118, 255);
`;

const DownloadButton = styled.TouchableOpacity`
  padding-top: 11px;
  margin-left: auto;
`;

interface Props {
  editor: string;
  type: string;
  number: string;
  url: string;
}

export const DocumentItem: React.FC<Props> = ({
  editor,
  type,
  number,
  url,
}) => {
  const navigation = useNavigation();
  return (
    <Container>
      <ViewerButton
        onPress={() => navigation.navigate('Pdf', { url, title: type })}>
        <DocumentIcon width={18} height={18} color="#000" />
        <Text>{`${type} (${editor} ${number})`}</Text>
      </ViewerButton>

      <DownloadButton onPress={linking(url)}>
        <DownloadIcon width={18} height={18} color="red" />
      </DownloadButton>
    </Container>
  );
};
