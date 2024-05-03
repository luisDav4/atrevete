import { query, where, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const obtenerRechazos = async () => {
  const requestsCollection = collection(db, 'requests');
  const clientRejectedQuery = query(requestsCollection, where('rejectedBy', '==', 'client'));
  const providerRejectedQuery = query(requestsCollection, where('rejectedBy', '==', 'provider'));
  const clientRejectedSnapshot = await getDocs(clientRejectedQuery);
  const providerRejectedSnapshot = await getDocs(providerRejectedQuery);
  const clientRejectedCount = clientRejectedSnapshot.size;
  const providerRejectedCount = providerRejectedSnapshot.size;
  return { clientRejectedCount, providerRejectedCount };
};