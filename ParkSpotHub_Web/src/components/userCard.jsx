import { Card, Metric, Text } from '@tremor/react';
import { query, where, getDocs, collection, orderBy, startAt, endAt } from 'firebase/firestore';
import appFirebase from '../firebase.config';

const obtenerPromedioPreciosPorTipoAlquiler = async (rentType, startDate, endDate) => {
  const rentsCollection = collection(appFirebase , 'rents');
  const q = query(
    rentsCollection,
    where('rentType', '==', rentType),
    where('startTime', '>=', startDate),
    where('endTime', '<=', endDate)
  );
  const querySnapshot = await getDocs(q);
  const rentPrices = querySnapshot.docs.map((doc) => doc.data().offerAccepted);
  const totalRents = rentPrices.length;
  const totalPrice = rentPrices.reduce((sum, price) => sum + price, 0);
  const averagePrice = totalPrice / totalRents;
  return averagePrice;
};

export function CardUsers() {
  return (
    <Card
      className=" bg-gray-200 mx-auto max-w-xs"
      decoration="top"
      decorationColor="indigo"
    >
      <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Horas</p>
      <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">40</p>
    </Card>
  );
}