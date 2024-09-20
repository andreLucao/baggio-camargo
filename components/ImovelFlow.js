import React, { useState } from 'react';
import CompraImovel from './CompraImovel';
import EmprestimoImovel from './EmprestimoImovel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

export default function ImovelFlow() {
  const [step, setStep] = useState(1);
  const [flowType, setFlowType] = useState(null);

  const handleNextStep = (nextStep, type = null) => {
    setStep(nextStep);
    if (type) setFlowType(type);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Renderizar título e parágrafo apenas se step for 1 */}
      {step === 1 && (
        <>
          <h1 className="text-3xl font-bold text-[#0524DD] mb-4">O que você está buscando?</h1>
          <p className="text-lg text-[#4B5563] mb-6">
            Você precisa de um <strong>Financiamento Imobiliário</strong> ou <strong>Empréstimo com garantia de imóvel</strong>?
          </p>
        </>
      )}

      {step === 1 && (
        <div className="flex space-x-4">
          <div
            onClick={() => handleNextStep(2, 'compra')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition"
          >
            <FontAwesomeIcon icon={faHouse} size="4x" className="icon-color" />
            <p className="mt-4 text-sm font-medium">Quero comprar um imóvel</p>
          </div>
          <div
            onClick={() => handleNextStep(2, 'emprestimo')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition"
          >
            <FontAwesomeIcon icon={faMoneyBill} size="4x" className="icon-color" />
            <p className="mt-4 text-sm font-medium text-center">Quero empréstimo usando meu imóvel.</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          {flowType === 'compra' && <CompraImovel />}
          {flowType === 'emprestimo' && <EmprestimoImovel />}
        </>
      )}
    </div>
  );
}
