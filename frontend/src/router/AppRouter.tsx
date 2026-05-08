import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'
import Inicio from '../pages/Inicio'
import { ChatProvider } from '../context/ChatContext'

function AppRouter() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <LayoutPrincipal>
          <Routes>
            <Route path="/" element={<Inicio />} />
          </Routes>
        </LayoutPrincipal>
      </ChatProvider>
    </BrowserRouter>
  )
}

export default AppRouter
