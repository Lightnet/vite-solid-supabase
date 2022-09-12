/*
  Project Name: ss-rts
  License: MIT
  Created by: Lightnet
*/

// https://stackoverflow.com/questions/71159169/how-to-update-entire-row-in-supabase-table-getting-400-error

//import { AuthSession } from '@supabase/supabase-js'
import { createEffect, createSignal } from 'solid-js'
import { supabase } from '../../libs/supabaseclient'
import Avatar from './Avatar'

const Account = ({ session }) => {
  const [loading, setLoading] = createSignal(true)
  const [username, setUsername] = createSignal("test")
  const [website, setWebsite] = createSignal("E")
  const [avatarUrl, setAvatarUrl] = createSignal(null)

  createEffect(() => {
    getProfile()
  })

  const getProfile = async () => {
    try {
      setLoading(true)
      //console.log(session)
      const { user } = session

      let { data, error, status } = await supabase
        .from('profiles')
        //.select(`username, website, avatar_url`)
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        console.log(data)
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    //e.preventDefault()

    try {
      setLoading(true)
      const { user } = session

      const updates = {
        id: user.id,
        username: username(),
        website: website(),
        avatar_url: avatarUrl(),
        updated_at: new Date().toISOString(),
      }
      console.log(updates)

      //let { data, error } = await supabase.from('profiles').insert([updates])
      let { data, error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div aria-live="polite">
        <div>Email: {session.user.email}</div>
        <div>
          <label for="username">Name</label>
          <input
            id="username"
            type="text"
            value={username() || ''}
            onChange={(e) => setUsername(e.currentTarget.value)}
          />
        </div>
        <div>
          <label for="website">Website</label>
          <input
            id="website"
            type="text"
            value={website() || ''}
            onChange={(e) => setWebsite(e.currentTarget.value)}
          />
        </div>
        <div>
          <Avatar 
            url={avatarUrl()}
            size={64}
            onUpload={(url) => {
              setAvatarUrl(url)
              updateProfile({})
            }}
          />
        </div>
        <div>
          <button type="submit" class="button primary block" onClick={updateProfile} disabled={loading()}>
            {loading() ? 'Saving ...' : 'Update profile'}
          </button>
        </div>
        <button type="button" class="button block" onClick={() => supabase.auth.signOut()}>
          Sign Out
        </button>
    </div>
  )
}

export default Account