import React, { useState } from 'react';

export default function EmprestimoVeiculo() {
  const [step, setStep] = useState(1);
  const [veiculo, setVeiculo] = useState({
    objetivo: '',
    tipo: '',
    prazo: '',
    marca: '',
    modelo: '',
    anoModelo: '',
    anoVeiculo: '',
    valorVeiculo: '',
    valorEmprestimo: '',
    veiculoQuitado: '',
    propriedade: '',
    score: '',
    restritivos: '',
    dadosPessoais: {
      nome: '',
      cpf: '',
      ocupacao: '',
      renda: '',
      dataNascimento: '',
      whatsapp: '',
      email: '',
      cep: '',
      estado: '',
      cidade: '',
      bairro: '',
      rua: '',
      numero: '',
      complemento: ''
    }
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNextStep = (nextStep) => setStep(nextStep);

  const handleInputChange = (field, value) => {
    setVeiculo({ ...veiculo, [field]: value });
  };

  const areInputsValid = () => {
    return (
      dadosPessoais.nome &&
      dadosPessoais.cpf &&
      dadosPessoais.ocupacao &&
      dadosPessoais.renda &&
      dadosPessoais.dataNascimento &&
      dadosPessoais.whatsapp &&
      dadosPessoais.email &&
      dadosPessoais.cep &&
      dadosPessoais.estado &&
      dadosPessoais.cidade &&
      dadosPessoais.bairro &&
      dadosPessoais.rua &&
      dadosPessoais.numero
    );
  };

  const handlePersonalDataChange = (field, value) => {
    setVeiculo({ ...veiculo, dadosPessoais: { ...veiculo.dadosPessoais, [field]: value } });
  };

  const handleSelection = (category, value) => {
    setVeiculo({ ...veiculo, [category]: value });
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 max-w-4xl mx-auto">
      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">Qual é o objetivo do seu crédito?</h1>
          <h2 className="text-lg mb-4 text-center">Para podermos escolher o melhor produto para você, vamos começar entendendo a finalidade do crédito.</h2>
          <div className="flex flex-wrap justify-center space-x-4 mb-4">
            {['Quitar Dividas', 'Investir', 'Capital de Giro', 'Outros'].map(option => (
              <div
                key={option}
                onClick={() => handleSelection('objetivo', option)}
                className={`card p-4 cursor-pointer ${veiculo.objetivo === option ? 'bg-blue-200' : 'bg-white'}`}
              >
                {option}
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(2)} className="btn bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">Qual é o tipo do veículo?</h1>
          <h2 className="text-lg mb-4 text-center">Escolha a opção que mais se adequa.</h2>
          <div className="flex flex-wrap justify-center space-x-4 mb-4">
            {['Veículo leve', 'Veículo pesado'].map(option => (
              <div
                key={option}
                onClick={() => handleSelection('tipo', option)}
                className={`card p-4 cursor-pointer ${veiculo.tipo === option ? 'bg-blue-200' : 'bg-white'}`}
              >
                {option}
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(3)} className="btn bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">Agora precisamos dos dados do veículo</h1>
          <h2 className="text-lg mb-4 text-center">Preencha tudo para que possamos prosseguir.</h2>
          <select
            value={veiculo.marca}
            onChange={(e) => handleInputChange('marca', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          >
            <option value="">Selecione a marca do veículo</option>
            {['Acura', 'Agrale', 'Alfa Romeo', 'Audi', 'BMW', 'Fiat', 'Ford', 'Honda', 'Hyundai', 'Toyota'].map(marca => (
              <option key={marca} value={marca}>{marca}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Modelo do veículo"
            value={veiculo.modelo}
            onChange={(e) => handleInputChange('modelo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          />
          <input
            type="text"
            placeholder="Ano do modelo"
            value={veiculo.anoModelo}
            onChange={(e) => handleInputChange('anoModelo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          />
          <input
            type="text"
            placeholder="Ano do veículo"
            value={veiculo.anoVeiculo}
            onChange={(e) => handleInputChange('anoVeiculo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          />
          <button onClick={() => handleNextStep(4)} className="btn bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">Qual prazo você prefere?</h1>
          <h2 className="text-lg mb-4 text-center">Escolha a quantidade de parcelas que acredita se encaixar em sua renda.</h2>
          <div className="flex flex-wrap justify-center space-x-4 mb-4">
            {['12 meses', '24 meses', '36 meses', '48 meses', '60 meses'].map(prazo => (
              <div
                key={prazo}
                onClick={() => handleSelection('prazo', prazo)}
                className={`card p-4 cursor-pointer ${veiculo.prazo === prazo ? 'bg-blue-200' : 'bg-white'}`}
              >
                {prazo}
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(5)} className="btn bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">Quais os valores da operação?</h1>
          <h2 className="text-lg mb-4 text-center">Preencha os valores para gerarmos sua simulação.</h2>
          <input
            type="text"
            placeholder="Valor aproximado do veículo"
            value={veiculo.valorVeiculo}
            onChange={(e) => handleInputChange('valorVeiculo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required
          />
          <input
            type="range"
            min="0"
            max={veiculo.valorVeiculo ? veiculo.valorVeiculo * 0.9 : 0}
            value={veiculo.valorEmprestimo}
            onChange={(e) => handleInputChange('valorEmprestimo', e.target.value)}
            className="w-full mb-4"
            
          />
          <input
            type="text"
            placeholder="Valor do empréstimo"
            value={veiculo.valorEmprestimo}
            onChange={(e) => handleInputChange('valorEmprestimo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required
          />
          <button onClick={() => handleNextStep(6)} className="btn bg-blue-500 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="flex flex-col items-center w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center text-blue-600">Por favor, preencha seus dados pessoais</h1>
          <h2 className="text-lg mb-4 text-center">Para a análise do crédito, precisamos de algumas informações adicionais.</h2>
          <input
            type="text"
            placeholder="Nome completo"
            value={veiculo.dadosPessoais.nome}
            onChange={(e) => handlePersonalDataChange('nome', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required
          />
          <input
            type="text"
            placeholder="CPF"
            value={veiculo.dadosPessoais.cpf}
            onChange={(e) => handlePersonalDataChange('cpf', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Ocupação"
            value={veiculo.dadosPessoais.ocupacao}
            onChange={(e) => handlePersonalDataChange('ocupacao', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            

          />
          <input
            type="text"
            placeholder="Renda"
            value={veiculo.dadosPessoais.renda}
            onChange={(e) => handlePersonalDataChange('renda', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            value={veiculo.dadosPessoais.dataNascimento}
            onChange={(e) => handlePersonalDataChange('dataNascimento', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="WhatsApp"
            value={veiculo.dadosPessoais.whatsapp}
            onChange={(e) => handlePersonalDataChange('whatsapp', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="email"
            placeholder="Email"
            value={veiculo.dadosPessoais.email}
            onChange={(e) => handlePersonalDataChange('email', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="CEP"
            value={veiculo.dadosPessoais.cep}
            onChange={(e) => handlePersonalDataChange('cep', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Estado"
            value={veiculo.dadosPessoais.estado}
            onChange={(e) => handlePersonalDataChange('estado', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Cidade"
            value={veiculo.dadosPessoais.cidade}
            onChange={(e) => handlePersonalDataChange('cidade', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Bairro"
            value={veiculo.dadosPessoais.bairro}
            onChange={(e) => handlePersonalDataChange('bairro', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Rua"
            value={veiculo.dadosPessoais.rua}
            onChange={(e) => handlePersonalDataChange('rua', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Número"
            value={veiculo.dadosPessoais.numero}
            onChange={(e) => handlePersonalDataChange('numero', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
            required

          />
          <input
            type="text"
            placeholder="Complemento"
            value={veiculo.dadosPessoais.complemento}
            onChange={(e) => handlePersonalDataChange('complemento', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          />
          <button
            onClick={() => handleNextStep(8)}
            disabled={!areInputsValid()}
            className={`bg-blue-500 text-white py-2 px-4 rounded-lg transition ${!areInputsValid() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
              }`}
            button />
        </div>
      )}

      {step === 8 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Infelizmente, no momento, não há empréstimos disponíveis para o seu perfil.</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Caso surja alguma oportunidade, entraremos em contato com você.</h2>
        </div>
      )}

    </div>
  );
}
