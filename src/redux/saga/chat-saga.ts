import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import { receiveMessage, sendMessage } from '../slices/chat-slice';
import PushNotification from 'react-native-push-notification';

function* handleSendMessage(action: PayloadAction<{ text: string; user: string; timestamp: Date }>) {
  // Here, simulate different responses from User 2
  const user2Responses = [
    "Hi, This is Shubham",
    "How are you?",
    "I'm Shubham, What's up",
    "Let's chat!",
  ];

  yield delay(1000); // Simulate network delay

  // Choose a random message from User 2
  const randomResponse = user2Responses[Math.floor(Math.random() * user2Responses.length)];

  yield put(receiveMessage({ text: randomResponse, user: 'User 2', timestamp: new Date() }));

  PushNotification.localNotification({
    channelId: 'fcm_fallback_channel',
    title: 'New Message',
    message: `User 2: ${randomResponse}`,
    priority: 'high',          // Set the priority to high
    importance: 'high',        // Ensure the importance is high
    vibrate: true,             // Enable vibration (optional)
    playSound: true,           // Play a notification sound (optional)
    soundName: 'default',      // Use default sound or custom sound
  });
}

export function* watchSendMessage() {
  yield takeLatest(sendMessage.type, handleSendMessage);
}