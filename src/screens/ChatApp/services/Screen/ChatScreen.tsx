import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../../../redux/slices/chat-slice';
import { RootState } from '@reduxjs/toolkit/query';

const ChatScreen: React.FC = () => {
  const [text, setText] = useState<string>('');
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat?.messages);
  console.log('messages', messages);
  

  const handleSend = () => {
    dispatch(sendMessage({ text, user: 'User 1', timestamp: new Date() }));
    setText('');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, backgroundColor: item.user === 'User 1' ? 'lightblue' : 'lightgray', marginVertical: 5 }}>
            <Text>{item.user}: {item.text}</Text>
            <Text>{new Date(item.timestamp).toLocaleTimeString()}</Text>
          </View>
        )}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        placeholder="Type a message"
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
};

export default ChatScreen;