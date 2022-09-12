/*
  Project Name: vite-solid-supabase
  License: MIT
  Created by: Lightnet
*/

import { createEffect, createSignal } from 'solid-js'
import { useAuth } from './AuthProvider.jsx';

export default function Access(props) {
  //const [session, setSession] = createSignal(null)
  const [session] = useAuth();

  createEffect(() => {
    console.log(session())
  })

  return (
    <>
      {!session() ? <>
        <label> Login Required! </label>
      </> : <>
        {props.children}
      </>}
    </>
  )
}
