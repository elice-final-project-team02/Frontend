import { RecoilRoot } from 'recoil';
import { Footer, Header, MaxWidth } from './components';

import './styles/index.scss';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <RecoilRoot>
      <div className="entireWrapper">
        <MaxWidth>
          <Header />
        </MaxWidth>
        <main>
          <MaxWidth >
            <Outlet />
          </MaxWidth>
        </main>
        <MaxWidth>
          <Footer />
        </MaxWidth>
      </div>
    </RecoilRoot>
  );
}

export default App;
