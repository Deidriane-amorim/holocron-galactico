import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { formatar, traduzir, formatarNascimento } from '../utils/formatar'

function DetalhesPersonagem() {
  const { id } = useParams()
  const [personagem, setPersonagem] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)
  const [imagemFalhou, setImagemFalhou] = useState(false)

  useEffect(() => {
    async function buscarPersonagem() {
      try {
        const resposta = await fetch(`https://swapi.dev/api/people/${id}/`)

        if (!resposta.ok) {
          throw new Error('Personagem não encontrado.')
        }

        const dados = await resposta.json()
        setPersonagem(dados)
      } catch (e) {
        console.error(e)
        setErro('Não foi possível carregar este personagem.')
      } finally {
        setCarregando(false)
      }
    }

    buscarPersonagem()
  }, [id])

  if (carregando) {
    return <p className="mensagem">Carregando personagem...</p>
  }

  if (erro) {
    return (
      <div className="mensagem erro">
        <p>Ops! {erro}</p>
        <Link to="/" className="voltar">← Voltar para a lista</Link>
      </div>
    )
  }

  return (
    <div className="detalhes">
      <Link to="/" className="voltar">← Voltar para a lista</Link>

      <div className="detalhes-conteudo">
        {imagemFalhou ? (
          <div className="detalhes-reserva">🤖</div>
        ) : (
          <img
            src={`/personagens/${id}.jpg`}
            alt={personagem.name}
            className="detalhes-foto"
            onError={() => setImagemFalhou(true)}
          />
        )}

        <div className="detalhes-info">
          <h2>{personagem.name}</h2>
          <p>Altura: {formatar(personagem.height, ' cm')}</p>
          <p>Massa: {formatar(personagem.mass, ' kg')}</p>
          <p>Ano de nascimento: {formatarNascimento(personagem.birth_year)}</p>
          <p>Gênero: {traduzir(personagem.gender)}</p>
          <p>Cor do cabelo: {traduzir(personagem.hair_color)}</p>
          <p>Cor da pele: {traduzir(personagem.skin_color, true)}</p>
          <p>Cor dos olhos: {traduzir(personagem.eye_color)}</p>
        </div>
      </div>
    </div>
  )
}

export default DetalhesPersonagem