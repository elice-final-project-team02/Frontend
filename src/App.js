import React from 'react';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserVerifiedApp } from './components';

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <UserVerifiedApp />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
