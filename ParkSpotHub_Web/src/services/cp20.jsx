import { query, orderBy, limit, getDocs, collection } from 'firebase/firestore';
import { db } from './firebase';

const obtenerTop20Usuarios = async () => {
  const usersCollection = collection(db, 'users');
  const q = query(usersCollection, orderBy('rating', 'desc'), limit(20));
  const querySnapshot = await getDocs(q);
  const top20Users = querySnapshot.docs.map((doc) => doc.data());
  return top20Users;
};
//export default obtenerTop20Usuarios
