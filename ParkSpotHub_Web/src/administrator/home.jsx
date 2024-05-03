import Sidebar from '../components/Sidebar'
import React, { useEffect, useState } from 'react';
//import { CardUsers } from '../components/userCard'
import { Title, BarList, Card, Badge, List, ListItem } from '@tremor/react';
import { query, orderBy, limit, getDocs, collection, where } from 'firebase/firestore';
import { db } from '../services/firebase';

function Home() {
  const [top20Users, setTop20Users] = useState([]);
  
  useEffect(() => {
    const usersCollection = collection(db, 'users');
    const usersQuery = query(usersCollection, orderBy('rating', 'desc'));
    getDocs(usersQuery)
    .then((resp) => {
      setTop20Users(
        resp.docs.map((doc) => {
          return {...doc.data(), id: doc.id }
        })
      );
    });
  }, []);

  const [worstRatedUsers, setWorstRatedUsers] = useState([]);
  useEffect(() => {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, orderBy('rating', 'asc'));
    getDocs(q)
    .then((resps) => {
      setWorstRatedUsers(
        resps.docs.map((doc) => {
          return {...doc.data(), id: doc.id }
        })
      );
    });
  }, []);

  const [clientRejectedCount, setclientRejectedCount] = useState([]);
  const [providerRejectedCount, setproviderRejectedCount] = useState([]);
  useEffect(() => {
    const requestsCollection = collection(db, 'requests');
    const clientRejectedQuery = query(requestsCollection, where('rejectedBy', '==', 'client'));
    const providerRejectedQuery = query(requestsCollection, where('rejectedBy', '==', 'provider'));
    getDocs(clientRejectedQuery)
    .then((resps1) => {
      setclientRejectedCount(resps1.size)
    });
    getDocs(providerRejectedQuery)
    .then((resps2) => {
      setproviderRejectedCount(resps2.size)
    });
  }, []);

  const [averagePriceHours, setaveragePriceHours] = useState(0);
  const [averagePriceDays, setaveragePriceDays] = useState(0);
  useEffect(() => {
    const rentsCollection = collection(db, 'rents');
    const qhours = query(
      rentsCollection,
      where('rentType', '==', 'hours'),
      where('startTime', '>=', new Date('2024-01-01')),
      where('endTime', '<=', new Date('2024-12-31'))
    );
    const qdays = query(
      rentsCollection,
      where('rentType', '==', 'days'),
      where('startTime', '>=', new Date('2024-01-01')),
      where('endTime', '<=', new Date('2024-12-31'))
    );
    getDocs(qhours)
    .then((respsh) => {
      const rentPrices = respsh.docs.map((doc) => doc.data().offerAccepted);
      const totalRents = rentPrices.length;
      const totalPrice = rentPrices.reduce((sum, price) => sum + price, 0);
      const averagePrice = totalPrice / totalRents;
      setaveragePriceHours(averagePrice)
    });
    getDocs(qdays)
    .then((respsd) => {
      const rentPrices = respsd.docs.map((doc) => doc.data().offerAccepted);
      const totalRents = rentPrices.length;
      const totalPrice = rentPrices.reduce((sum, price) => sum + price, 0);
      const averagePrice = totalPrice / totalRents;
      setaveragePriceDays(averagePrice)
    });
  }, []);

  return (
    <main className="flex">
      <Sidebar />
      <div className="flex-1 m-8">
        <h1 className="text-2xl font-bold mb-8">Inicio</h1>
        <div className="grid grid-cols-4 gap-8">
          <Card
            className="max-w-xs"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Rechazos por clientes
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {clientRejectedCount}
            </p>
          </Card>
          <Card
            className="max-w-xs"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Rechazos por proveedores
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {providerRejectedCount}
            </p>
          </Card>
          <Card
            className="max-w-xs"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Promedio de precios x día
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {isNaN(averagePriceDays) ? '-' : averagePriceDays.toFixed(2)}
            </p>
          </Card>
          <Card
            className="max-w-xs"
            decoration="top"
            decorationColor="indigo"
          >
            <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              Promedio de precios x hora
            </p>
            <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {isNaN(averagePriceHours) ? '-' : averagePriceHours.toFixed(2)}
            </p>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-8 mt-8">
          <Card>
            <div className="mt-6">
              <Title>Top 20 Usuarios</Title>
              {top20Users.length > 0 ? (
                <List>
                  {top20Users.map((usuario) => (
                    <ListItem key={usuario.id} >
                      <Badge color="blue" icon={undefined}>
                        {usuario.username} - Rating: {usuario.rating}⭐
                      </Badge>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p>Cargando...</p>
              )}
            </div>
          </Card>
          <Card>
            <div className="mt-6">
              <Title>Top 20 Peores Usuarios</Title>
              {worstRatedUsers.length > 0 ? (
                <List>
                  {worstRatedUsers.map((usuario) => (
                    <ListItem key={usuario.id}>
                      <Badge color="red" icon={undefined}>
                        {usuario.username} - Rating: {usuario.rating}⭐
                      </Badge>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <p>Cargando...</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default Home