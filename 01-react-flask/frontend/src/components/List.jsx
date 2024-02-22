import React, { useCallback, useEffect, useState } from "react";
import { ComunaAPI } from "../services/apiComuna";
import ListItem from "./ListItem";

function List() {
  const [comunas, setComunas] = useState([]);
  const [xml, setXml] = useState(null);
  const [ready, setReady] = useState(false);

  async function fetchData() {
    const data = await ComunaAPI.getComunasTest();
    setComunas(data);
    return data;
  }

  function generateXml() {
    if (comunas) {
      let xmlData = '<?xml version="1.0" encoding="UTF-8"?><comunas>';
      comunas.forEach(([id, name]) => {
        xmlData += "<comuna>";
        xmlData += `<id>${id}</id>`;
        xmlData += `<name>${name}</name>`;
        xmlData += "</comuna>";
      });
      xmlData += "</comunas>";
      setXml(xmlData);
      setReady(true);
    }
  }

  function downloadXml() {
    if (xml) {
      const blob = new Blob([xml], { type: "text/xml" });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "comunas.xml";
      a.style.display = "none";
      document.body.appendChild(a);

      a.click();

      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }

  const handleXml = () => {
    generateXml();
    downloadXml();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto w-1/3">
      <h1 className="text-white text-xl font-semibold text-center p-5">
        Comunas que pertenecen a una región que contiene una 'm'
      </h1>
      <div className="flex justify-between">
        <button
          className="bg-sky-300 p-3 rounded-full text-sm font-semibold hover:bg-sky-500 hover:text-white transition"
          onClick={handleXml}
        >
          Convertir a XML
        </button>
        {ready ? (
          <button
            className="bg-sky-300 p-3 rounded-full text-sm font-semibold hover:bg-sky-500 hover:text-white transition"
            onClick={downloadXml}
          >
            Descargar XML
          </button>
        ) : (
          ""
        )}
      </div>
      {comunas.map((comuna, index) => (
        <ListItem key={index} comuna={comuna} />
      ))}
    </div>
  );
}

export default List;
