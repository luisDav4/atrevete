import { query, where, getDocs, collection, orderBy, startAt, endAt } from 'firebase/firestore';
import { db } from './firebase';

const obtenerPromedioPreciosPorTipoAlquiler = (rentType, startDate, endDate) => {
  const rentsCollection = collection(db, 'rents');
  const q = query(
    rentsCollection,
    where('rentType', '==', rentType),
    where('startTime', '>=', startDate),
    where('endTime', '<=', endDate)
  );
  const querySnapshot = getDocs(q);
  const rentPrices = querySnapshot.docs.map((doc) => doc.data().offerAccepted);
  const totalRents = rentPrices.length;
  const totalPrice = rentPrices.reduce((sum, price) => sum + price, 0);
  const averagePrice = totalPrice / totalRents;
  return averagePrice;
};