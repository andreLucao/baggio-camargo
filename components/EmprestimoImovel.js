import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faStore, faDollarSign, faCalendarAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function EmprestimoImovel() {
  const [step, setStep] = useState(1);
  const [Prazo, setPrazo] = useState('');
  const [valorImovel, setValorImovel] = useState('');
  const [valorEmprestimo, setValorEmprestimo] = useState(0);
  const [dadosPessoais, setDadosPessoais] = useState({
    //data from step 7 only
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

const calculaRendaMin = () =>{
  let parcela = calculaParcela(Prazo, valorEmprestimo);
  let rendaMin = parcela / 0.349;
  return rendaMin;
}

  const handleNextStep = (nextStep, Prazo = null) => {
    if (Prazo) {
      setPrazo(parseInt(Prazo.replace(' meses', ''), 10));   
    }
    setStep(nextStep);
  };

  const handlePersonalDataChange = (field, value) => {
    setDadosPessoais(prevState => ({
      ...prevState,
      [field]: value
    }));
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

  const calculaParcela = (Prazo, valorEmprestimo) => {
    
    const taxa = 1.29 /100;

    let parcelaMensal = (valorEmprestimo * taxa) / (1 - Math.pow((1 + taxa), -Prazo));
    return parcelaMensal;
  };

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Qual é o objetivo do seu crédito?</h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 text-center">Para podermos escolher o melhor produto para você, vamos começar entendendo a finalidade do crédito.</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Quitar dívidas', 'Investir', 'Capital de giro', 'Outros'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(2)}
                className="card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition w-40 sm:w-48 lg:w-56"
              >
                <FontAwesomeIcon icon={faDollarSign} size="3x" className="icon-color mb-2" />
                <p className="text-lg sm:text-xl font-semibold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Qual o perfil do imóvel?</h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 text-center">Selecione o tipo do imóvel que irá utilizar</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { label: 'Casa', icon: faHouse },
              { label: 'Apartamento', icon: faBuilding },
              { label: 'Sala Comercial', icon: faStore },
              { label: 'Outros', icon: faDollarSign }
            ].map((item, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(3)}
                className="card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition w-40 sm:w-48 lg:w-56"
              >
                <FontAwesomeIcon icon={item.icon} size="3x" className="icon-color mb-2" />
                <p className="text-lg sm:text-xl font-semibold">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Qual prazo você prefere?</h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 text-center">Escolha a quantidade de parcelas que acredita se encaixar na sua renda.</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['60 meses', '120 meses', '180 meses', '240 meses'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(4, option)}  
                className="card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition w-40 sm:w-48 lg:w-56"
              >
                <FontAwesomeIcon icon={faCalendarAlt} size="3x" className="icon-color mb-2" />
                <p className="text-lg sm:text-xl font-semibold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Quais os valores da operação?</h1>
          <h2 className="text-lg sm:text-xl lg:text-2xl mb-4 text-center">Por favor, preencha os dados para gerarmos sua simulação, estamos quase lá!</h2>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Valor aproximado do imóvel</label>
            <input
              type="number"
              value={valorImovel}
              onChange={(e) => setValorImovel(e.target.value)}
              placeholder="R$..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Valor do empréstimo</label>
            <input
              type="range"
              min="0"
              max={Math.round(valorImovel * 0.9)}
              value={valorEmprestimo}
              onChange={(e) => setValorEmprestimo(e.target.value)}
              className="w-full"
            />
            <p className="text-center mt-2">Valor selecionado: R${valorEmprestimo}</p>
            <input
              type="number"
              value={valorEmprestimo}
              onChange={(e) => setValorEmprestimo(e.target.value)}
              placeholder="R$..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button onClick={() => handleNextStep(5)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 5 */}
      {step === 5 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">O imóvel está averbado?</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {['Sim', 'Não'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(6)}
                className="card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition w-40 sm:w-48 lg:w-56"
              >
                <FontAwesomeIcon
                  icon={option === 'Sim' ? faCheck : faTimes}
                  size="3x"
                  className="icon-color mb-2"
                />
                <p className="text-lg sm:text-xl font-semibold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">O imóvel está financiado ou quitado?</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {['Financiado', 'Quitado'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(7)}
                className="card flex flex-col items-center p-4 bg-white shadow-lg rounded-lg cursor-pointer hover:bg-gray-100 transition w-40 sm:w-48 lg:w-56"
              >
                <FontAwesomeIcon icon={faCheck} size="3x" className="icon-color mb-2" />
                <p className="text-lg sm:text-xl font-semibold">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 7 */}
      {step === 7 && (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-center">Dados Pessoais</h1>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Nome completo</label>
            <input
              type="text"
              value={dadosPessoais.nome}
              onChange={(e) => handlePersonalDataChange('nome', e.target.value)}
              placeholder="Nome completo"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">CPF</label>
            <input
              type="text"
              value={dadosPessoais.cpf}
              onChange={(e) => handlePersonalDataChange('cpf', e.target.value)}
              placeholder="CPF"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Ocupação</label>
            <input
              type="text"
              value={dadosPessoais.ocupacao}
              onChange={(e) => handlePersonalDataChange('ocupacao', e.target.value)}
              placeholder="Ocupação"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Renda</label>
            <input
              type="text"
              value={dadosPessoais.renda}
              onChange={(e) => handlePersonalDataChange('renda', e.target.value)}
              placeholder="Renda"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Data de Nascimento</label>
            <input
              type="date"
              value={dadosPessoais.dataNascimento}
              onChange={(e) => handlePersonalDataChange('dataNascimento', e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">WhatsApp</label>
            <input
              type="text"
              value={dadosPessoais.whatsapp}
              onChange={(e) => handlePersonalDataChange('whatsapp', e.target.value)}
              placeholder="WhatsApp"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">E-mail</label>
            <input
              type="email"
              value={dadosPessoais.email}
              onChange={(e) => handlePersonalDataChange('email', e.target.value)}
              placeholder="E-mail"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">CEP</label>
            <input
              type="text"
              value={dadosPessoais.cep}
              onChange={(e) => handlePersonalDataChange('cep', e.target.value)}
              placeholder="CEP"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Estado</label>
            <input
              type="text"
              value={dadosPessoais.estado}
              onChange={(e) => handlePersonalDataChange('estado', e.target.value)}
              placeholder="Estado"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Cidade</label>
            <input
              type="text"
              value={dadosPessoais.cidade}
              onChange={(e) => handlePersonalDataChange('cidade', e.target.value)}
              placeholder="Cidade"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Bairro</label>
            <input
              type="text"
              value={dadosPessoais.bairro}
              onChange={(e) => handlePersonalDataChange('bairro', e.target.value)}
              placeholder="Bairro"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Rua</label>
            <input
              type="text"
              value={dadosPessoais.rua}
              onChange={(e) => handlePersonalDataChange('rua', e.target.value)}
              placeholder="Rua"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Número</label>
            <input
              type="text"
              value={dadosPessoais.numero}
              onChange={(e) => handlePersonalDataChange('numero', e.target.value)}
              placeholder="Número"
              className="w-full p-2 border border-gray-300 rounded-lg"
              required
            />
          </div>
          <div className="w-full sm:w-4/5 lg:w-3/4 mb-4">
            <label className="block mb-1">Complemento</label>
            <input
              type="text"
              value={dadosPessoais.complemento}
              onChange={(e) => handlePersonalDataChange('complemento', e.target.value)}
              placeholder="Complemento"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
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
          <main className="flex flex-col items-center">

          
          {calculaRendaMin() < dadosPessoais.renda ? (
            <>
          <div className="text-center">
            <h1 className="font-bold text-custom-blue text-3xl mb-4">Olá {dadosPessoais.nome}.</h1>
            <h2 className="text-xl mb-6 text-custom-blue">Aqui está o resultado da sua simulação</h2>
          </div>

          <div className="flex justify-around w-full mt-4 bg-gray-100 p-4 rounded-lg shadow-lg">
            <div className="text-center">
              <p className="font-semibold">Valor Solicitado</p>
              <p className="font-bold text-custom-blue text-2xl">{valorEmprestimo}</p>
            </div>

              
          </div>

            <div className="flex justify-center mt-6">
              <p className="font-semibold text-lg"></p>
            </div>

          <div className="flex justify-around border-2 w-full mt-2 p-4 text-lg bg-white rounded-lg shadow">
            <div className="text-center">
              <p>Taxa: <span className="font-bold">16,63% a.a</span></p>
            </div>
          </div>

          <div className="flex justify-center mt-4">
            <p className="font-bold text-xl">Parcelamento</p>
          </div>

          <p className="flex justify-center font-bold text-custom-blue text-2xl mt-2">
          {Prazo} meses - R$ {calculaParcela(Prazo, valorEmprestimo)} mês
          </p>

            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4 text-custom-blue">Infelizmente, no momento, não há empréstimos disponíveis para o seu perfil.</h1>
              <h2 className="text-lg mb-4 text-custom-gray text-center">Caso surja alguma oportunidade, entraremos em contato com você.</h2>
            </>
          )}
          </main>
        </div>
      )}

    </div>
  );
}
