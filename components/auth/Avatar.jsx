/*
  Project Name: vite-solid-supabase
  License: MIT
  Created by: Lightnet
*/

// https://supabase.com/docs/guides/with-react

import { createEffect, createSignal } from 'solid-js'
import { supabase } from '../../libs/supabaseclient'

//export default function Avatar({ url, size, onUpload }) {//does not watch changes?
export default function Avatar(props) {
  const [avatarUrl, setAvatarUrl] = createSignal(props.url || null)
  const [uploading, setUploading] = createSignal(false)

  const downloadImage = async (path) => {
    //console.log(path)
    try {
      const { data, error } = await supabase.storage
        .from('avatars')
        .download(path)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      setAvatarUrl(url)
    } catch (error) {
      console.log('Error downloading image: ', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      let uuid = crypto.randomUUID().replaceAll("-","")
      //console.log(uuid)
      //const fileName = `${Math.random()}.${fileExt}`
      const fileName = `avatar${uuid}.${fileExt}`
      //console.log(fileName)
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      props.onUpload(filePath)
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  createEffect(() => {
    //console.log(props.url)
    if (props.url) downloadImage(props.url)
  })

  return (
    <div style={{ width: props.size }} aria-live="polite">
      <img
        width={props.size}
        height={props.size}
        src={avatarUrl() ? avatarUrl() : `https://place-hold.it/${props.size}x${props.size}`}
        alt={avatarUrl() ? 'Avatar' : 'No image'}
        className="avatar image"
        style={{ height: props.size, width: props.size }}
      />
      {uploading() ? (
        'Uploading...'
      ) : (
        <>
          <label className="button primary block" htmlFor="single">
            Upload an avatar
          </label>
            <input
              type="file"
              id="single"
              accept="image/*"
              onChange={uploadAvatar}
              disabled={uploading()}
            />
        </>
      )}
    </div>
  )
}