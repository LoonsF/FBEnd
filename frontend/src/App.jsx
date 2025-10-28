import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = 'http://localhost:5000/api'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/data`)
      setData(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    try {
      const response = await axios.post(`${API_URL}/data`, {
        message: message
      })
      alert(`Respuesta del backend: ${response.data.status}`)
      setMessage('')
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚀 Mi Aplicación FullStack</h1>
        <p>Frontend + Backend desplegados en Oracle Cloud</p>
        
        <div className="section">
          <h2>📊 Datos del Backend:</h2>
          {loading ? (
            <p>Cargando datos...</p>
          ) : (
            <ul>
              {data.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>

        <div className="section">
          <h2>💬 Enviar Mensaje al Backend:</h2>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
          />
          <button onClick={sendMessage}>Enviar</button>
        </div>

        <div className="info">
          <p><strong>Frontend:</strong> React + Vite</p>
          <p><strong>Backend:</strong> Node.js + Express</p>
          <p><strong>Despliegue:</strong> Oracle Cloud Infrastructure</p>
          <p><strong>Infraestructura:</strong> Terraform + GitHub Actions</p>
        </div>
      </header>
    </div>
  )
}

export default App