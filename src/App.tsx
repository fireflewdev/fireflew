import './index.css';
// import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { useContext } from 'react';
import { Navigate } from 'react-router'
// import { Cookies, useCookies } from 'react-cookie';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Home from './pages/Home';
import { NotFoundPage } from './pages/NotFoundPage';
import Music from './pages/Music';
import Portfolio from './pages/Portfolio';

export const router = createBrowserRouter([{
  // element: <Layout/>,
  children:
    [{
      path: "/",
      Component: Home
    },
    {
      path: "/music",
      Component: Music
    },
    {
      path: "/portfolio",
      Component: Portfolio
    }
    ], errorElement: <NotFoundPage title="Oops!" body={"Hmm...can't find that page."} backPath={"/"} />
}
], {});

function App() {
  return (
    <div className="App-body" style={{ width: "100%" }}>
      <DndProvider backend={HTML5Backend}>
        {/* <div className="App-body" style={{ width: '100%', overflow: 'scroll' }}> */}
        <RouterProvider
          router={router} />
        {/* </div> */}
      </DndProvider>
    </div>
  )
}

export default App;
