import { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './pages/App.jsx';
import { Routedata } from './components/common/routingdata.jsx';

import ScrollToTop from './components/layout-components/scroll-to-top/scrolltotop.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Fragment>
    <BrowserRouter>
    <ScrollToTop/>
      <Routes>
        <Route path={`${import.meta.env.BASE_URL}`} element={<App />}>
          {Routedata.map((idx) => (
            <Route key={idx.id} path={idx.path} element={idx.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  </Fragment>
)
