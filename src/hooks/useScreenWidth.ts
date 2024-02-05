// Hook customizado para obter a largura da tela
// É usado para a aplicação de responsividade

import { useEffect, useState } from 'react'

// Hook customizado, obtém a largura da tela
export const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })

    return () => {
      window.removeEventListener('resize', () => {
        setScreenWidth(window.innerWidth)
      })
    }
  }, [])

  return screenWidth
}
