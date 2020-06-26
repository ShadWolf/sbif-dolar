import React from "react";

export default function BtnYear(props) {
  async function clickAction() {
    console.log("valor año");
    let y = props.y;
    const url =
      "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/" +
      y +
      "?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";
    const res = await fetch(url, { method: "GET" });
    res
      .json()
      .then(data => {
        props.SendData(data);
      })
      .catch(error => props.SendError);
  }

  return <button onClick={clickAction}> Valor del año </button>;
}
