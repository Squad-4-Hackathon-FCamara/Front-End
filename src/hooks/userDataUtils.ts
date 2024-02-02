import { useContext, useEffect } from 'react'
import { AxiosAPI } from '../AxiosConfig'
import { ApplicationContext } from '../contexts/ApplicationContext'

export function isUserLoggedIn() {
  const isUserLoggedIn = Boolean(
    document.cookie
      .split('; ')
      .find((cookie) => cookie.startsWith('is-logged-in='))
      ?.split('=')[1],
  )

  return isUserLoggedIn
}

export function useUserData() {
  const { storeUserData } = useContext(ApplicationContext)

  useEffect(() => {
    const getData = async () => {
      if (isUserLoggedIn()) {
        await AxiosAPI.get('user/me/data')
          .then((response) => {
            storeUserData(
              response.data.id,
              response.data.firstName,
              response.data.lastName,
              response.data.avatar_url,
              response.data.projects,
            )
          })
          .catch((error) => {
            console.error(error)
          })
      }
    }

    getData()
  }, [storeUserData])
}

// // Obtem os dados do usuário logado
// export async function GetUserData() {
//   const { storeUserData } = useContext(ApplicationContext)

//   if (isUserLoggedIn()) {
//     await AxiosAPI.get('user/me/data')
//       .then((response) => {
//         storeUserData(
//           response.data.id,
//           response.data.firstName,
//           response.data.lastName,
//           response.data.avatar_url,
//           response.data.projects,
//         )
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }
// }
