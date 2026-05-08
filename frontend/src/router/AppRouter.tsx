import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutPrincipal from '../components/layout/LayoutPrincipal'
import Inicio from '../pages/Inicio'
import PaginaChat from '../pages/PaginaChat'
import { ChatProvider } from '../context/ChatContext'

function AppRouter() {
  return (
    <BrowserRouter>
      <ChatProvider>
        <Routes>
          <Route
            path="/"
            element={
              <LayoutPrincipal>
                <Inicio />
              </LayoutPrincipal>
            }
          />
          <Route
            path="/chat"
            element={
              <LayoutPrincipal variant="app">
                <PaginaChat />
              </LayoutPrincipal>
            }
          />
        </Routes>
      </ChatProvider>
    </BrowserRouter>
  )
}

export default AppRouter
