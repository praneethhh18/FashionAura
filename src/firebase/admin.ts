// The `firebase-admin` package is optional in some environments (CI). If not installed,
// typechecking can fail. We ignore the TS error here; in production you should
// install `firebase-admin` and its types.
// @ts-ignore: Optional dependency for server environments
import * as admin from 'firebase-admin';

const hasBeenInitialized = admin.apps.length > 0;

export function initAdmin() {
  if (hasBeenInitialized) {
    return {
      auth: admin.auth(),
      firestore: admin.firestore()
    };
  }

  // NOTE: This is a hack to get around the fact that the service account key
  // is not available in the CI/CD environment. This should be replaced with a
  // more robust solution in a real-world application.
  let serviceAccount;
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string);
  } catch (e) {
    console.error('Could not parse FIREBASE_SERVICE_ACCOUNT_KEY');
    throw e;
  }

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });

  return {
    auth: admin.auth(),
    firestore: admin.firestore()
  };
}
