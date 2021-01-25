## 30 day challenge app

The idea is to have an app that tracks my progress and keeps me accountable when I am trying to learn something.

## Can I run my own version of this?

Sure! A couple of env variables are needed:

- REACT_APP_LOCALSTORAGE_KEY - Local storage key to recognize you as admin on the site
- REACT_APP_LOCALSTORAGE_VALUE - value to match that key against
- REACT_APP_API - I use my own hosted version of https://jsonbox.io/ but you can easily use a box in the online version that is free
- REACT_APP_CLOUD_NAME - For the image upload I use cloudinary and that will require you to create a free account
- REACT_APP_PRESET- Unassigned uploads need a preset. https://cloudinary.com/documentation/create_upload_preset_tutorial

This is a terrible login system, i am aware but on the other hand it works for now so it's the easiest thing I could come up with 🤷🏻‍♀️

After these are all set you can use netlify to host it, redirect are already in place.

## Run locally

```
yarn && yarn start
```

MIT License
