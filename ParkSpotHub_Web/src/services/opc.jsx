import { query, orderBy, limit, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const obtenerUsuariosConPeoresCalificaciones = async (limit) => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, orderBy('rating', 'asc'), limit(limit));
  const querySnapshot = await getDocs(q);
  const worstRatedUsers = querySnapshot.docs.map((doc) => doc.data());
  return worstRatedUsers;
};