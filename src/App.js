import { RecoilRoot } from 'recoil';
import { Footer, Header, MaxWidth } from './components';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/index.scss';
import { Outlet } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <div className="entireWrapper">
          <Header />
          <main>
            <MaxWidth>
              <Outlet />
            </MaxWidth>
          </main>
          <Footer />
        </div>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
