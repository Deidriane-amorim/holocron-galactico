import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatar } from '../utils/formatar'

function CardPersonagem({ personagem }) {
  const [imagemFalhou, setImagemFalhou] = useState(false)

  const id = personagem.url.split('/').filter(Boolean).pop()

  return (
    <Link to={`/personagem/${id}`} className="link-card">
      <div className="card-personagem">
        {imagemFalhou ? (
          <div className="foto-reserva">🤖</div>
        ) : (
          <img
            src={`/personagens/${id}.jpg`}
            alt={personagem.name}
            className="foto-personagem"
            onError={() => setImagemFalhou(true)}
          />
        )}
        <h2>{personagem.name}</h2>
        <p>Altura: {formatar(personagem.height, ' cm')}</p>
        <p>Massa: {formatar(personagem.mass, ' kg')}</p>
        <p>Ano de nascimento: {formatar(personagem.birth_year)}</p>
      </div>
    </Link>
  )
}

export default CardPersonagem