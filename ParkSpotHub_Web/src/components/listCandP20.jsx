import React, { useState, useEffect } from 'react';
import { Card, Title, Metric, BarList, Badge } from '@tremor/react';
import obtenerPromedioPreciosPorTipoAlquiler from '../services/prices'
import obtenerRechazos from '../services/rCP'
import obtenerTop20Usuarios from '../services/cp20'
import obtenerUsuariosConPeoresCalificaciones from '../services/opc'

const ReportesComponent = () => {
  const [promedioHoras, setPromedioHoras] = useState(0);
  const [promedioDias, setPromedioDias] = useState(0);
  const [rechazos, setRechazos] = useState({ clientRejectedCount: 0, providerRejectedCount: 0 });
  const [top20Usuarios, setTop20Usuarios] = useState([]);
  const [peoresCalificaciones, setPeoresCalificaciones] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const startDate = new Date('2023-01-01');
      const endDate = new Date('2023-12-31');
      const promedioHorasResult = await obtenerPromedioPreciosPorTipoAlquiler('hours', startDate, endDate);
      const promedioDiasResult = await obtenerPromedioPreciosPorTipoAlquiler('days', startDate, endDate);
      const rechazosResult = await obtenerRechazos();
      const top20UsuariosResult = await obtenerTop20Usuarios();
      const peoresCalificacionesResult = await obtenerUsuariosConPeoresCalificaciones(20);
      setPromedioHoras(promedioHorasResult);
      setPromedioDias(promedioDiasResult);
      setRechazos(rechazosResult);
      setTop20Usuarios(top20UsuariosResult);
      setPeoresCalificaciones(peoresCalificacionesResult);
    };
    obtenerDatos();
  }, []);

  return (
    <main className="bg-slate-50 p-6 sm:p-10">
      <Title>Reportes</Title>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <Metric>Promedio precios por horas</Metric>
          <h3 className="truncate text-xl font-semibold text-blue-500">${promedioHoras.toFixed(2)}</h3>
        </Card>

        <Card>
          <Metric>Promedio precios por días</Metric>
          <h3 className="truncate text-xl font-semibold text-blue-500">${promedioDias.toFixed(2)}</h3>
        </Card>

        <Card>
          <Metric>Rechazos por clientes</Metric>
          <h3 className="truncate text-xl font-semibold text-blue-500">{rechazos.clientRejectedCount}</h3>
        </Card>

        <Card>
          <Metric>Rechazos por proveedores</Metric>
          <h3 className="truncate text-xl font-semibold text-blue-500">{rechazos.providerRejectedCount}</h3>
        </Card>
      </div>

      <div className="mt-6">
        <Title>Top 20 Usuarios</Title>
        <BarList
          data={top20Usuarios.map((usuario) => ({
            name: usuario.username,
            rating: usuario.rating,
          }))}
          valueFormatter={(value) => `Rating: ${value}`}
          className="mt-6"
        />
      </div>

      <div className="mt-6">
        <Title>Usuarios con peores calificaciones</Title>
        <div className="mt-6 flex flex-wrap gap-2">
          {peoresCalificaciones.map((usuario) => (
            <Badge key={usuario.id} color="red" icon={undefined}>
              {usuario.username} - Rating: {usuario.rating}
            </Badge>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ReportesComponent;