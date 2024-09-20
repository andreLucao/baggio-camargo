import React, { useState } from 'react';
import CompraVeiculo from './CompraVeiculo';
import EmprestimoVeiculo from './EmprestimoVeiculo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faMoneyBill } from '@fortawesome/free-solid-svg-icons';

export default function VeiculoFlow() {
  const [step, setStep] = useState(1);
  const [flowType, setFlowType] = useState(null);

  const handleNextStep = (nextStep, type = null) => {
    setStep(nextStep);
    if (type) setFlowType(type);
  };

  return (
    <div className="flex flex-col items-center">
      {step === 1 && (
        <div className="flex space-x-4">
          <div
            onClick={() => handleNextStep(2, 'compra')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition"
          >
            <FontAwesomeIcon icon={faCar} size="4x" className="icon-color" />
            <p className="mt-4 text-xl">Comprar Veículo</p>
          </div>
          <div
            onClick={() => handleNextStep(2, 'emprestimo')}
            className="flex flex-col items-center justify-center w-48 h-48 bg-white rounded-lg shadow-md hover:bg-gray-200 cursor-pointer transition"
          >
            <FontAwesomeIcon icon={faMoneyBill} size="4x" className="icon-color" />
            <p className="mt-4 text-xl">Empréstimo</p>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          {flowType === 'compra' && <CompraVeiculo />}
          {flowType === 'emprestimo' && <EmprestimoVeiculo />}
        </>
      )}
    </div>
  );
}
