import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  user: string;
  timestamp: Date;
}

interface ChatState {
  messages: Message[];
}

const initialState: ChatState = {
  messages: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<Message>) => {
      console.log(action.payload);
      
      state.messages.push(action.payload);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;
export default chatSlice.reducer;