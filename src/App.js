import React, { useState, useEffect } from "react";
//import ReactDOM from "react-dom";
import "./styles.css";

import Grafico from "./components/Grafico";
import BtnYear from "./components/BtnYear";
import BtnMonth from "./components/BtnMonth";

const useFetch = (url) => {
  const [valhoy, setValHoy] = useState(null);
  const [fechahoy, setFechaHoy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  async function fetchData(url) {
    console.log("url", url);
    const res = await fetch(url, { method: "GET" });
    console.log("res", res);
    res
      .json()
      .then((text) => {
        console.log("text", text);
        if (text.CodigoHTTP && text.CodigoHTTP === 404) {
          console.log("fetchData");
          setLoading(false);
          setError(true);
          setErrMsg(text.Mensaje);
        } else {
          console.log("resultado consulta inicial: ", text.Dolares[0].Valor);
          setFechaHoy(text.Dolares[0].Fecha);
          setValHoy(text.Dolares[0].Valor);
          setLoading(false);
          setErrMsg("Error servicio");
        }
      })
      .catch((error) => {
        console.log("error fetchData", error);
        setLoading(false);
        setError(true);
      });

    return;
  }

  useEffect(() => {
    fetchData(url);
  });

  return { loading, error, errMsg, valhoy, fechahoy };
};

export default function App() {
  let [state, setState] = useState({ label: "", data: [] });
  let [errorGraf, setErrorGraf] = useState(false);
  let [errGrafMsg, setErrGrafMsg] = useState("");
  const hoy = new Date();
  const year = hoy.getFullYear().toString();
  const month = String(hoy.getMonth() + 1);

  const urldolarHoy =
    "https://api.sbif.cl/api-sbifv3/recursos_api/dolar?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";

  const { loading, error, errMsg, valhoy, fechahoy } = useFetch(urldolarHoy);

  function ConvertData(data) {
    let newData = [];

    // console.log("ConverData data", data);
    const lista = data.Dolares;
    for (let i = 0; i < lista.length; i++) {
      let d = lista[i];
      let value = Number(d.Valor.replace(",", "."));
      // console.log("value", v(alue);
      newData.push([i, value]);
    }

    return newData;
  }

  async function ShowDataA(data) {
    setState({ label: "", data: [] });
    setErrorGraf(false);
    setErrGrafMsg("");
    if (data.CodigoHTTP && data.CodigoHTTP === 404) {
      console.log("fetchData");
      setErrorGraf(true);
      setErrGrafMsg(data.Mensaje);
    } else {
      let convData = await ConvertData(data);
      let dataGraf = {
        label: "Anual",
        data: convData
      };
      setState(dataGraf);
    }
  }

  async function ShowDataM(data) {
    setState({ label: "", data: [] });
    setErrorGraf(false);
    setErrGrafMsg("");
    if (data.CodigoHTTP && data.CodigoHTTP === 404) {
      console.log("fetchData");
      setErrorGraf(true);
      setErrGrafMsg(data.Mensaje);
    } else {
      let convData = await ConvertData(data);
      let dataGraf = {
        label: "Mensual",
        data: convData
      };

      setState(dataGraf);
    }
  }

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          Hoy &nbsp;
          {new Intl.DateTimeFormat("es-CL", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          }).format(new Date())}
          :<p style={{ color: "red" }}> {errMsg} </p>
        </div>
      ) : (
        <div>
          <h3>
            Valor de Hoy &nbsp;
            {new Intl.DateTimeFormat("es-CL", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            }).format(new Date())}
            del Dólar: {valhoy} CLP
          </h3>
        </div>
      )}
      {
        <div>
          <h1>Evolucion del Dólar</h1>
          <BtnYear SendData={ShowDataA} y={year} />
          <BtnMonth SendData={ShowDataM} y={year} m={month} />
        </div>
      }
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
      {errorGraf ? (
        <div>
          <p style={{ color: "red" }}> {errGrafMsg}</p>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}
