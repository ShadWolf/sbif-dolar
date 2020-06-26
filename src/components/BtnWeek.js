import React from "react";

export default function BtnWeek(props) {
  async function clickAction() {
    console.log("valor semanal");
    let y = props.y;
    let m = props.m;
    let d = props.d;
    let loop = Number(d) - 7;
    let results = [];

    while (loop !== Number(d) - 1) {
      let url =
        "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/" +
        y +
        "/" +
        m +
        "/" +
        loop +
        "?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";
      const res = await fetch(url, { method: "GET" });
      res
        .json()
        .then(data => {
          results.push(data.Dolares[0]);
        })
        .catch(error => props.SendError);
      loop++;
    }
    let url =
      "https://api.sbif.cl/api-sbifv3/recursos_api/dolar/" +
      y +
      "/" +
      m +
      "/" +
      loop +
      "?apikey=9c84db4d447c80c74961a72245371245cb7ac15f&formato=json";
    const res = await fetch(url, { method: "GET" });
    res
      .json()
      .then(data => {
        results.push(data.Dolares[0]);
        console.log(results);

        props.SendData({ Dolares: results });
      })
      .catch(error => props.SendError);
  }

  return <button onClick={clickAction}> Valor Semanal </button>;
}
