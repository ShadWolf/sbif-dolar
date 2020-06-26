import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import "./styles.css";

import Grafico from "./components/Grafico";

const useFetch = url => {
  const [valhoy, setValHoy] = useState(null);
  const [fechahoy, setFechaHoy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchData(url) {
    console.log("url", url);
    const res = await fetch(url, { method: "GET" });
    res
      .json()
      .then(text => {
        console.log("resultado consulta inicial: ", text.Dolares[0].Valor);
        setFechaHoy(text.Dolares[0].Fecha);
        setValHoy(text.Dolares[0].Valor);
        setLoading(false);
      })
      .catch(error => {
        console.log("error", error);
        setLoading(false);
        setError(true);
      });

    return;
  }

  useEffect(() => {
    fetchData(url);
  });

  return { loading, error, valhoy, fechahoy };
};

export default function App() {
  const urldolarHoy =
    "https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";

  function getAlAño() {
    console.log("Evolucion al año");
  }

  const { loading, error, valhoy, fechahoy } = useFetch(urldolarHoy);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          <p style={{ color: "red" }}> Error detected</p>
        </div>
      ) : (
        <div>
          <h3>
            Valor de Hoy &nbsp;
            {new Intl.DateTimeFormat("es-CL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            }).format(new Date(fechahoy))}{" "}
            del Dólar: {valhoy}
          </h3>

          <h1>Evolucion del Dólar</h1>
          <Grafico />
          <button onClick={getAlAño()}>Valor Año</button>
          <button onClick={console.log("valor mes")}>Valor Mes</button>
          <button onClick={console.log("valor semana")}>Valor Semana</button>
        </div>
      )}
    </div>
  );
}
