# vite-solid-supabase

# Packages:
- vite
- solid-js
- express
- @supabase/supabase-js

# Information:
  Simple project test for vite, solid, supabase and other packages.

  For solid-js for javascript and html build for UI and logic. Supabase for client database

  Note is base on supabase setup from docs. Some stuff was outdate. But should simalar to react and vue that worked on.

  https://supabase.com/docs/guides/with-solidjs

  Update to fit the solid context and Provider for handle access auth. To have router to handle page url.

```
App

  AuthProvider (top root level of the context)
    - session 
    - createEffect
      - check for supabase.auth.onAuthStateChange
        - update session
  
  - Router
      - index ( page )
        - check which element render for login or account
        - login 
        - Account ( jsx )
          - get auth context > session
          - get / update data
      - about ( page )
        - display information
```


# Set up:
```
npm install 

npm run server
```


# .env
```
VITE_SUPABASE_URL=""
VITE_SUPABASE_ANON_KEY=""
```