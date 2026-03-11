import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: 'AIzaSyDIxm4jvsxy2WGWBAGa8ESPpnCd_je4vLU',
  authDomain: 'a6bpotfolio.firebaseapp.com',
  projectId: 'a6bpotfolio',
  databaseURL: 'https://a6bpotfolio-default-rtdb.firebaseio.com',
  storageBucket: 'a6bpotfolio.firebasestorage.app',
  messagingSenderId: '901037145341',
  appId: '1:901037145341:web:07a8ef555f397d5f515294',
  measurementId: 'G-55C8LQ0139'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const rtdb = getDatabase(app, firebaseConfig.databaseURL);

let analytics = null;
isSupported().then((ok) => {
  if (ok) analytics = getAnalytics(app);
});

export { app, db, rtdb, analytics };
