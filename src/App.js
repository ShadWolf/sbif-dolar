import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import "./styles.css";

import Grafico from "./components/Grafico";
import BtnYear from "./components/BtnYear";
import BtnMonth from "./components/BtnMonth";
import BtnWeek from "./components/BtnWeek";

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

  const { loading, error, valhoy, fechahoy } = useFetch(urldolarHoy);

  let [state, setState] = useState({ label: "", data: [] });

  function ConvertData(data) {
    let newData = [];

    // console.log("ConverData data", data);
    const lista = data.Dolares;
    for (let i = 0; i < lista.length; i++) {
      let d = lista[i];
      // console.log("d: ", d);
      let value = Number(d.Valor.replace(",", "."));
      // console.log("value", value);
      newData.push([i, value]);
      // console.log("newData", newData);
    }
    //console.log("newData", newData);
    return newData;
  }

  async function ShowData(data) {
    setState({ label: "", data: [] });
    let convData = await ConvertData(data);
    // console.log("showData data: ", data);
    //console.log("showData convData", convData);
    let dataGraf = {
      label: "Dolar Anual",
      data: convData
    };

    setState(dataGraf);
  }

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
            del Dólar: {valhoy} CLP
          </h3>

          <h1>Evolucion del Dólar</h1>
          <BtnYear SendData={ShowData} y={fechahoy.split("-")[0]} />
          <BtnMonth
            SendData={ShowData}
            y={fechahoy.split("-")[0]}
            m={fechahoy.split("-")[1]}
          />
          <BtnWeek
            SendData={ShowData}
            y={fechahoy.split("-")[0]}
            m={fechahoy.split("-")[1]}
            d={fechahoy.split("-")[2]}
          />
        </div>
      )}
      {state.data.length !== 0 ? (
        <div>
          <Grafico showData={state} />
        </div>
      ) : (
        <div>
          <br />
          <br />
          <br />
          <br />
          Selecionar un periodo.
        </div>
      )}
    </div>
  );
}
