/*
  Project Name: vite-solid-supabase
  License: MIT
  Created by: Lightnet
*/

//import { createEffect } from 'solid-js'
//import { supabase } from '../libs/supabaseclient.js';
import Auth from '../components/auth/Auth.jsx';
import Account  from '../components/auth/Account.jsx';
import { useAuth } from '../components/auth/AuthProvider.jsx';

export default function PageHome() {

  const [session, {setSession}] = useAuth();

  return (
    <div class="container" style={{ padding: '50px 0 100px 0' }}>
      {!session() ? <Auth /> : <Account session={session()} />}
    </div>
  )
}