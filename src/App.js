import React, { useState } from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserVerifiedApp } from './components';

export const queryClient = new QueryClient();

function App() {

  const [messageBoxState, setMessageBoxState] = useState(false);
  const [chatId, setChatId] = useState('');

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <UserVerifiedApp messageBoxState={messageBoxState} setMessageBoxState={setMessageBoxState} chatId={chatId} setChatId={setChatId} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
