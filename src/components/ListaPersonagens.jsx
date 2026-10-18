import { useState, useEffect } from 'react'
import CardPersonagem from './CardPersonagem'
import imagemVazio from '../assets/yoda.png'

function ListaPersonagens() {
  const [personagens, setPersonagens] = useState([])
  const [busca, setBusca] = useState('')
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [tentativa, setTentativa] = useState(0);

 useEffect(() => {
  async function buscarPersonagens() {
    try {
      const resposta = await fetch("https://swapi.dev/api/people/");

      if (!resposta.ok) {
        throw new Error("Não foi possível carregar os personagens.");
      }

      const dados = await resposta.json();
      setPersonagens(dados.results);
   } catch (e) {
  setErro("Não foi possível carregar os personagens. Tente novamente mais tarde.");
    } finally {
      setCarregando(false);
    }
  }

  buscarPersonagens();
}, [tentativa]);

function tentarNovamente() {
  setErro(null);
  setCarregando(true);
  setTentativa(tentativa + 1);
}

  const personagensFiltrados = personagens.filter(personagem =>
    personagem.name.toLowerCase().includes(busca.toLowerCase())
  )

  if (carregando) {
  return <p className="mensagem">Carregando personagens da galáxia...</p>;
}

if (erro) {
  return (
    <div className="mensagem erro">
      <p>Ops! {erro}</p>
      <button onClick={tentarNovamente} className="botao-tentar">
        Tentar novamente
      </button>
    </div>
  );
}

  return (
    <div>
        <div className="caixa-busca">
        <svg
          className="icone-busca"
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Buscar personagem..."
          value={busca}
          onChange={evento => setBusca(evento.target.value)}
          className="campo-busca"
        />
      </div>

            <div className="lista-personagens">
        {personagensFiltrados.length === 0 ? (
          <p className="mensagem">
  Nesta galáxia, inexistente o personagem é.
  <br />
  <img src={imagemVazio} alt="Yoda de braços cruzados chateado" className="imagem-vazio" />
</p>
        ) : (
          personagensFiltrados.map(personagem => (
            <CardPersonagem key={personagem.name} personagem={personagem} />
          ))
        )}
      </div>
    </div>
  )
}

export default ListaPersonagens