import React, { useEffect, useRef } from 'react';

const UnityPlayer = ({ token, cursoId }) => {
  const unityContainerRef = useRef(null);

  useEffect(() => {
    // Función para mandar datos a Unity
    const sendDataToUnity = () => {
      if (window.UnityInstance) {
        console.log('UnityInstance encontrado, enviando datos...');
        //mandar token
        window.UnityInstance.SendMessage('Receiver', 'ReceiveToken', token);
        //mandar cursoId
        window.UnityInstance.SendMessage('Receiver', 'ReceiveCursoId', cursoId.toString());
      } else {
        console.warn('UnityInstance no encontrado aún.');
      }
    };

    // Esperar que Unity esté cargado
    const checkUnityLoaded = setInterval(() => {
      if (window.UnityInstance) {
        sendDataToUnity();
        clearInterval(checkUnityLoaded); // Deja de checar una vez enviado
      }
    }, 1000); // Checa cada 1 segundo

    // Limpiar el intervalo si desmontamos
    return () => clearInterval(checkUnityLoaded);
  }, [token, cursoId]);

  return (
    <div style={{ width: '960px', height: '600px', margin: '0 auto', paddingTop: '20px' }}>
      <h2>Unity WebGL Player</h2>
      {/* Aquí debería cargarse el Build de Unity (iframe o canvas) */}
      <div id="unity-container" ref={unityContainerRef} style={{ width: '100%', height: '100%' }}>
        {/* Unity debería montar su canvas aquí */}
      </div>
    </div>
  );
};

export default UnityPlayer;
