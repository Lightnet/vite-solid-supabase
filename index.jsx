/*
  Project Name: ss-rts
  License: MIT
  Created by: Lightnet
*/

import "./styles.css";

import { 
  createSignal
, lazy
, observable 
, from
, createMemo
, createResource
, createEffect 
, onCleanup
} from 'solid-js';
import { MetaProvider } from 'solid-meta';
import { createApp } from 'solid-utils';
import { Router, useRoutes } from '@solidjs/router';
import ThemeProvider from "./components/theme/ThemeProvider";
import IndexMenus from "./components/IndexMenus";
import Home from './pages/index.jsx';
import { AuthProvider } from "./components/auth/AuthProvider";

const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/about',
    component: lazy(() => import('./pages/about')),
  },
  {
    path: '/todolist',
    component: lazy(() => import('./pages/todolist')),
  },
];

const App = () => {
  const Route = useRoutes(routes);

  return (
    <ThemeProvider>
      <AuthProvider>
        <IndexMenus/>
        <Route />
      </AuthProvider>
    </ThemeProvider>
  );
};

const dispose = createApp(App).use(MetaProvider).use(Router).mount('#app');
//deal with the clean up reload
if (import.meta.hot) { //< module.hot
  //console.log(import.meta.hot)
  import.meta.hot.accept() //< module.hot.accept()
  import.meta.hot.dispose(dispose) //< module.hot.dispose(dispose)
  console.log("Hot Reload...")
} 