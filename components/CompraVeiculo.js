import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faTruck, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

export default function CompraVeiculo() {
  const [step, setStep] = useState(1);
  const [veiculo, setVeiculo] = useState({
    tipo: '',
    prazo: '',
    marca: '',
    modelo: '',
    anoModelo: '',
    anoVeiculo: '',
    valorVeiculo: '',
    valorEmprestimo: '',
    score: '',
    restritivos: ''
  });

  const [dadosPessoais, setDadosPessoais] = useState({
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
  });

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

  const [selectedOption, setSelectedOption] = useState({ tipo: '', prazo: '', score: '', restritivos: '' });

  const handleNextStep = (nextStep) => setStep(nextStep);

  const handleInputChange = (field, value) => {
    setVeiculo({ ...veiculo, [field]: value });
  };

  const handlePersonalDataChange = (field, value) => {
    setVeiculo({ ...veiculo, dadosPessoais: { ...veiculo.dadosPessoais, [field]: value } });
  };

  const handleSelection = (category, value) => {
    setSelectedOption({ ...selectedOption, [category]: value });
    handleInputChange(category, value);
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Qual é o tipo do veículo?</h1>
          <h2 className="text-lg mb-4 text-center">Escolha a opção que mais se adequa.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 w-full">
            <div
              onClick={() => handleSelection('tipo', 'Veículo leve')}
              className={`card p-4 cursor-pointer ${selectedOption.tipo === 'Veículo leve' ? 'bg-blue-200' : ''}`}
            >
              Veículo leve
              <FontAwesomeIcon icon={faCar} className="text-4xl mb-2 icon-color" />
            </div>
            <div
              onClick={() => handleSelection('tipo', 'Veículo pesado')}
              className={`card p-4 cursor-pointer ${selectedOption.tipo === 'Veículo pesado' ? 'bg-blue-200' : ''}`}
            >
              Veículo pesado
              <FontAwesomeIcon icon={faTruck} className="text-4xl mb-2 icon-color" />
            </div>
          </div>
          <button onClick={() => handleNextStep(2)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Qual prazo você prefere?</h1>
          <h2 className="text-lg mb-4 text-center">Escolha a quantidade de parcelas que acredita se encaixar em sua renda.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4 w-full">
            {['12 meses', '24 meses', '36 meses', '48 meses', '60 meses'].map(prazo => (
              <div
                onClick={() => handleSelection('prazo', prazo)}
                className={`card p-4 cursor-pointer ${selectedOption.prazo === prazo ? 'bg-blue-200' : ''}`}
                key={prazo}
              >
                {prazo}
                <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl mb-2 icon-color" />
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(3)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Agora precisamos dos dados do seu veículo</h1>
          <h2 className="text-lg mb-4 text-center">Preencha tudo para que o simulador gere seus resultados.</h2>
          <select
            value={veiculo.marca}
            onChange={(e) => handleInputChange('marca', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          >
            <option value="">Selecione a marca do veículo</option>
            {/* Opções de marca do veículo */}
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
          <button onClick={() => handleNextStep(4)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Quais os valores da operação?</h1>
          <h2 className="text-lg mb-4 text-center">Por favor, preencha os dados para gerarmos sua simulação. Estamos quase lá!</h2>
          <input
            type="text"
            placeholder="Valor aproximado do veículo"
            value={veiculo.valorVeiculo}
            onChange={(e) => handleInputChange('valorVeiculo', e.target.value)}
            className="input-field mb-4 p-2 border rounded-md shadow-md w-full"
          />
          <input
            type="range"
            min="0"
            max={veiculo.valorVeiculo * 0.9}
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
          />
          <button onClick={() => handleNextStep(5)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Qual o seu score de crédito?</h1>
          <h2 className="text-lg mb-4 text-center">Escolha a faixa de score para prosseguir.</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 w-full">
            {['0', 'Acima de 300', 'Acima de 500', 'Acima de 700'].map(score => (
              <div
                onClick={() => handleSelection('score', score)}
                className={`card p-4 cursor-pointer ${selectedOption.score === score ? 'bg-blue-200' : ''}`}
                key={score}
              >
                {score}
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(6)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-2">Possui algum restritivo no nome?</h1>
          <h2 className="text-lg mb-4 text-center">Estamos quase lá, essa é uma pergunta importante!</h2>
          <div className="grid grid-cols-2 gap-4 mb-4 w-full">
            {['Sim', 'Não'].map(option => (
              <div
                onClick={() => handleSelection('restritivos', option)}
                className={`card p-4 cursor-pointer ${selectedOption.restritivos === option ? 'bg-blue-200' : ''}`}
                key={option}
              >
                {option}
              </div>
            ))}
          </div>
          <button onClick={() => handleNextStep(7)} className="btn bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}
      {/* Step 7 */}
      {step === 7 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Informações pessoais</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Preencha os dados abaixo para completarmos sua simulação de crédito</h2>
          <form className="w-full max-w-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Nome completo</label>
                <input
                  type="text"
                  value={dadosPessoais.nome}
                  onChange={(e) => handlePersonalDataChange('nome', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">CPF</label>
                <input
                  type="text"
                  value={dadosPessoais.cpf}
                  onChange={(e) => handlePersonalDataChange('cpf', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Ocupação</label>
                <input
                  type="text"
                  value={dadosPessoais.ocupacao}
                  onChange={(e) => handlePersonalDataChange('ocupacao', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Renda mensal</label>
                <input
                  type="text"
                  value={dadosPessoais.renda}
                  onChange={(e) => handlePersonalDataChange('renda', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Data de nascimento</label>
                <input
                  type="date"
                  value={dadosPessoais.dataNascimento}
                  onChange={(e) => handlePersonalDataChange('dataNascimento', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Whatsapp</label>
                <input
                  type="text"
                  value={dadosPessoais.whatsapp}
                  onChange={(e) => handlePersonalDataChange('whatsapp', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Email</label>
                <input
                  type="email"
                  value={dadosPessoais.email}
                  onChange={(e) => handlePersonalDataChange('email', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">CEP</label>
                <input
                  type="text"
                  value={dadosPessoais.cep}
                  onChange={(e) => handlePersonalDataChange('cep', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Estado</label>
                <input
                  type="text"
                  value={dadosPessoais.estado}
                  onChange={(e) => handlePersonalDataChange('estado', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Cidade</label>
                <input
                  type="text"
                  value={dadosPessoais.cidade}
                  onChange={(e) => handlePersonalDataChange('cidade', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Bairro</label>
                <input
                  type="text"
                  value={dadosPessoais.bairro}
                  onChange={(e) => handlePersonalDataChange('bairro', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Rua</label>
                <input
                  type="text"
                  value={dadosPessoais.rua}
                  onChange={(e) => handlePersonalDataChange('rua', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Número</label>
                <input
                  type="text"
                  value={dadosPessoais.numero}
                  onChange={(e) => handlePersonalDataChange('numero', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-custom-gray">Complemento</label>
                <input
                  type="text"
                  value={dadosPessoais.complemento}
                  onChange={(e) => handlePersonalDataChange('complemento', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>
          </form>
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
