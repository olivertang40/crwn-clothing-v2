import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAxpvVjLxH9cByHyDcn-913czeSVQQAfVo",
  authDomain: "crwn-clothing-db-63194.firebaseapp.com",
  projectId: "crwn-clothing-db-63194",
  storageBucket: "crwn-clothing-db-63194.appspot.com",
  messagingSenderId: "116117919310",
  appId: "1:116117919310:web:a380a659e5565c0ffcd51f"
}

const firebaseApp = initializeApp(firebaseConfig)

const googleprovider = new GoogleAuthProvider()

googleprovider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider)
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleprovider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}) => {
  if (!userAuth) return

  const userDocRef = doc(db, 'users', userAuth.uid)

  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log('error creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  return await createUserWithEmailAndPassword(auth, email, password)
}
