import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBuilding, faStore, faDollarSign, faCalendarAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default function CompraImovel() {
  const [step, setStep] = useState(1);
  const [valorImovel, setValorImovel] = useState('');
  const [Prazo, setPrazo] = useState('');
  const [carencia, setCarencia] = useState('');
  const [valorEmprestimo, setValorEmprestimo] = useState(0);
  const [valorEntrada, setValorEntrada] = useState('');
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

  const calculaRendaMin = () =>{
    let parcela = calculaParcela(Prazo, valorEmprestimo, carencia);
    let rendaMin = parcela / 0.349;
    return rendaMin;
  }

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

  const calculaParcela = (Prazo, valorEmprestimo, carencia) => {
    const taxa = 1.29 / 100;
    let novoPrazo = Prazo - carencia;
    

    let parcelaMensal = (valorEmprestimo * taxa) / (1 - Math.pow((1 + taxa), -novoPrazo));
    return parcelaMensal;
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-8">
      {/* Step 1 */}
      {step === 1 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Em quanto tempo pretende comprar o imóvel?</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Com isso entendemos sua urgência em conseguir o seu crédito.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Imediatamente', 'Em até 1 mês', 'Em até 3 meses', 'Acima de 3 meses'].map((option, index) => (
              <div
                key={index}
                onClick={() => {
                  const match = option.match(/\d+/);
                  const number = match ? match[0] : null; // Get the first match or null if no match
                  setCarencia(number);
                  handleNextStep(2)}}
                className="flex flex-col items-center justify-center w-full h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105 text-center p-4"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl mb-2 icon-color" />
                <p className="text-xl font-semibold text-custom-gray">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 2 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Qual o perfil do imóvel?</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Selecione o tipo do imóvel que irá utilizar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['Casa', 'Apartamento', 'Sala Comercial', 'Outros'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(3)}
                className="flex flex-col items-center justify-center w-full h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105 text-center p-4"
              >
                <FontAwesomeIcon
                  icon={
                    option === 'Casa'
                      ? faHouse
                      : option === 'Apartamento'
                      ? faBuilding
                      : option === 'Sala Comercial'
                      ? faStore
                      : faDollarSign
                  }
                  className="text-4xl mb-2 icon-color"
                />
                <p className="text-xl font-semibold text-custom-gray">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step === 3 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Qual prazo você prefere?</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Escolha a quantidade de parcelas que acredita se encaixar na sua renda.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {['120 meses', '180 meses', '240 meses', '360 meses', '420 meses'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(4, option)}
                className="flex flex-col items-center justify-center w-full h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105 text-center p-4"
              >
                <FontAwesomeIcon icon={faCalendarAlt} className="text-4xl mb-2 icon-color" />
                <p className="text-xl font-semibold text-custom-gray">{option}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 4 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Quais os valores da operação?</h1>
          <h2 className="text-lg mb-4 text-custom-gray text-center">Por favor, preencha os dados para gerarmos sua simulação, estamos quase lá!</h2>
          <div className="w-full mb-4">
            <label className="block mb-1 text-custom-gray">Valor aproximado do imóvel</label>
            <input
              type="number"
              value={valorImovel}
              onChange={(e) => setValorImovel(e.target.value)}
              placeholder="R$..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="w-full mb-4">
            <label className="block mb-1 text-custom-gray">Valor do empréstimo</label>
            <input
              type="range"
              min="0"
              max={Math.round(valorImovel * 0.9)}
              value={valorEmprestimo}
              onChange={(e) => setValorEmprestimo(e.target.value)}
              className="w-full"
            />
            <p className="text-center mt-2 text-custom-gray">Valor selecionado: R${valorEmprestimo}</p>
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
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Você possui um valor de entrada?</h1>
          <div className="w-full mb-4">
            <input
              type="number"
              value={valorEntrada}
              onChange={(e) => setValorEntrada(e.target.value)}
              placeholder="R$..."
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <button onClick={() => handleNextStep(6)} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">Próximo</button>
        </div>
      )}

      {/* Step 6 */}
      {step === 6 && (
        <div className="flex flex-col items-center w-full">
          <h1 className="text-2xl font-bold mb-4 text-custom-blue">Em relação à negociação</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Já tenho imóvel escolhido', 'Estou procurando um imóvel'].map((option, index) => (
              <div
                key={index}
                onClick={() => handleNextStep(7)}
                className="flex flex-col items-center justify-center w-full h-48 bg-white rounded-lg shadow-lg hover:bg-gray-200 cursor-pointer transition-transform transform hover:scale-105 text-center p-4"
              >
                <p className="text-xl font-semibold text-custom-gray">{option}</p>
                {option === 'Já tenho imóvel escolhido' ? (
                  <FontAwesomeIcon icon={faCheck} className="text-4xl mt-2 text-green-500" />
                ) : (
                  <FontAwesomeIcon icon={faTimes} className="text-4xl mt-2 text-red-500" />
                )}
              </div>
            ))}
          </div>
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

              <div className="text-center">
                <p className="font-semibold">Valor Total</p>
                <p className="font-bold text-2xl">1200 reais</p>
              </div>
          </div>

            <div className="flex justify-center mt-6">
              <p className="font-semibold text-lg">Taxas</p>
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
          {Prazo} meses - R$ {calculaParcela(Prazo, valorEmprestimo, carencia)} mês
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
