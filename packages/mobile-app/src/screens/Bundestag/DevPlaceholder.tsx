import Document from '@democracy-deutschland/mobile-ui/src/components/Icons/Document';
import AsyncStorage from '@react-native-community/async-storage';
import React, { FC, useContext, useEffect, useState } from 'react';
import unionBy from 'lodash.unionby';
import {
  Alert,
  Button,
  Clipboard,
  Text,
  TextInput,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import styled from 'styled-components/native';
import { InitialStateContext } from '../../context/InitialStates';
import VotesLocal from '../../lib/VotesLocal';
import { Notifications } from 'react-native-notifications';

const Container = styled.ScrollView.attrs({})`
  flex: 1;
  /* align-items: center; */
  /* justify-content: center; */
`;

interface State {
  notifications: any[];
  openedNotifications: any[];
  pushToken?: string | null;
  hasPermissions: boolean;
}

const LocalVotes = () => {
  const [localVotes, setLocalVotes] = useState('');
  const [newVotes, setNewVotes] = useState('');
  useEffect(() => {
    VotesLocal.readKeychain().then(data => setLocalVotes(JSON.stringify(data)));
  }, []);

  const push = () => {
    Notifications.postLocalNotification(
      {
        body: 'Local notification!',
        title: 'Local Notification Title',
        sound: 'push.aiff',
        identifier: `${new Date()}`,
        payload: '',
        badge: 0,
        thread: '',
        type: '',
      },
      1,
    );
  };

  return (
    <>
      <TextInput
        multiline
        style={{
          minHeight: Platform.OS === 'ios' && 3 ? 20 * 3 : 0,
          maxHeight: Platform.OS === 'ios' && 3 ? 20 * 3 : 0,
          borderWidth: 1,
        }}
        placeholder="Json Code"
        placeholderTextColor="red"
        numberOfLines={3}
        onChangeText={setNewVotes}
      />
      <Button
        title="add Local Votes"
        onPress={() => {
          const newVotesObj = JSON.parse(newVotes);
          const localVotesObj = JSON.parse(localVotes);
          const votes = {
            ...localVotesObj,
            d: [...unionBy(newVotesObj.d, localVotesObj.d, 'i')],
          };

          VotesLocal.writeKeychain(votes).then(() => {
            Alert.alert('local votes added');
            VotesLocal.readKeychain().then(data =>
              setLocalVotes(JSON.stringify(data)),
            );
          });
        }}
      />
      <Text>LocalVotes: {localVotes}</Text>
      <Button
        title="Copy Local Votes"
        onPress={() => {
          Clipboard.setString(localVotes);
          Alert.alert('local votes copied');
        }}
      />
      <Button
        title="Clear Local Votes Storage"
        onPress={() => {
          VotesLocal.reset();
          setLocalVotes(')');
        }}
      />
      <Button title="Push" onPress={push} />
    </>
  );
};

export const DevPlaceholder: FC = () => {
  const { isVerified } = useContext(InitialStateContext);
  return (
    <Container>
      <Text>{DeviceInfo.getBundleId()}</Text>
      <LocalVotes />

      {__DEV__ && <Text>is verified {JSON.stringify(isVerified)}</Text>}
      <Button
        title="Remove auth"
        onPress={() => {
          AsyncStorage.removeItem('auth_token');
          AsyncStorage.removeItem('auth_refreshToken');
        }}
      />
      <Button
        title="Clear Async Storage"
        onPress={() => AsyncStorage.clear()}
      />
      <Document width="32px" height="32px" color="black" />
    </Container>
  );
};
