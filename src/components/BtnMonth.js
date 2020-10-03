import React from "react";

export default function BtnMonth(props) {
  async function clickAction() {
    console.log("valor mensual");
    let y = props.y;
    let m = props.m;
    const url =
      "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/" +
      y +
      "/" +
      m +
      "?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";
    console.log("url month", url);
    const res = await fetch(url, { method: "GET" });
    res
      .json()
      .then((data) => {
        props.SendData(data);
      })
      .catch((error) => props.SendError);
  }

  return <button onClick={clickAction}> Valor Mensual</button>;
}
