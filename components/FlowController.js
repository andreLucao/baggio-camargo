'use client';

import React, { useState } from 'react';
import ImovelFlow from './ImovelFlow';
import VeiculoFlow from './VeiculoFlow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCar } from '@fortawesome/free-solid-svg-icons';

export default function FlowController() {
  const [flowType, setFlowType] = useState(null);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Renderizar título e parágrafo apenas se flowType for null */}
      {flowType === null && (
        <>
          <h1 className="text-3xl font-bold text-[#0524DD] mb-4">Vamos começar!</h1>
          <p className="text-lg text-[#4B5563] mb-6">Qual tipo de modalidade de crédito você busca?</p>
        </>
      )}

      {flowType === null && (
        <div className="flex space-x-4">
          <div
            onClick={() => setFlowType('imovel')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
          >
            <FontAwesomeIcon 
              icon={faHome} 
              size="4x" 
              className="icon-color" 
            />
            <p className="mt-4 text-xl font-semibold">Imóvel</p>
          </div>
          <div
            onClick={() => setFlowType('veiculo')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105"
          >
            <FontAwesomeIcon 
              icon={faCar} 
              size="4x" 
              className="icon-color" 
            />
            <p className="mt-4 text-xl font-semibold">Veículo</p>
          </div>
        </div>
      )}

      {flowType === 'imovel' && <ImovelFlow />}
      {flowType === 'veiculo' && <VeiculoFlow />}
    </div>
  );
}
