import React, { useState } from 'react';

//Três grandes conceitos do React
//Componente - Função que retorna algum conteúdo HTML, CSS, JS, etc,.
//Primeira letra do componente é Sempre Maiúscula
//Propriedade - Atributo do componete, exemplo, um título, o alinhamento, etc.
//Informações que um compenente pai passa para o 
//componente filho
//Estado - Informações mantidas pelo componente (Lembrar: imutabilidade)

function App() {

  const [counter, setCounter] = useState(0); //cria um vetor para desestruturar a resposta da função, que traz duas informações

  //Quando queremos uma função para o disparo de um 
  //botão, por exemplo, cria-se a função dentro da
  //função onde o botão encontra-se
  function incrementCounter() {
    setCounter(counter + 1);
  }

  return (

    //Ao colocar vários componetes em sequência,
    //Utiliza-se um conceito do react chamado
    //fragment, uma tag sem nomenclatura
    //O "title" será repassado como parâmetro ao header
    //que está sendo chamado!
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>Incrementar o contador</button>
    </>
  );
}

export default App;
