import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import ListaPersonagens from './components/ListaPersonagens'
import DetalhesPersonagem from './components/DetalhesPersonagem'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ListaPersonagens />} />
        <Route path="/personagem/:id" element={<DetalhesPersonagem />} />
      </Routes>
    </div>
  )
}

export default App