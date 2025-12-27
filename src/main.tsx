import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// 暂时注释掉这行 CSS，防止因找不到文件而白屏
// import './styles/global.css' 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)