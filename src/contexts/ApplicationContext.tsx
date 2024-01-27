// Contexto é uma forma de compartilhar estados entre todos os componentes da aplicação
// Em outras palavras, é um forma de compartilhar um ou mais useState entre os componentes
// Para isso, será utilizado um provedor de contexto no App.tsx

import { ReactNode, createContext, useEffect, useReducer } from "react";
import {
  ApplicationState,
  applicationReducer,
} from "../reducer/application/reducer";
import { toggleAddProjectDialogAction } from "../reducer/application/actions";

// Tipagem do contexto
interface ApplicationContextType {
  applicationState: ApplicationState;
  toggleAddProjectDialogIsOpen: (isOpen: boolean) => void;
}

// Tipagem do context provider
interface ApplicationContextProviderProps {
  children: ReactNode;
}

// Inicia e exporta o contexto
export const ApplicationContext = createContext({} as ApplicationContextType);

// Inicia e exporta o provedor de contexto
export function ApplicationContextProvider({
  children,
}: ApplicationContextProviderProps) {
  // usa o reducer, os parâmetros de useReducer são:
  /*
    reducer: A função criada no reducer.ts
    initialArg: O valor inicial do estado
    init: A função de inicialização do estado
  */
  const initialArg: ApplicationState = {
    addProjectDialogIsOpen: false,
  };

  const [applicationState, dispatch] = useReducer(
    applicationReducer,
    initialArg,
    (initialState) => {
      const storedStateAsJSON = localStorage.getItem(
        "@orange-portfolio:application-state-1.0.0"
      );

      if (storedStateAsJSON) {
        return JSON.parse(storedStateAsJSON);
      }

      return initialState;
    }
  );

  // useEffect para salvar o estado no localStorage
  useEffect(() => {
    const stateJSON = JSON.stringify(applicationState);

    localStorage.setItem(
      "@orange-portfolio:application-state-1.0.0",
      stateJSON
    );
  });

  // ▼▼▼ Funções/ações do reducer, são elas que nós vamos de fato usar nos componentes ▼▼▼
  function toggleAddProjectDialogIsOpen(isOpen: boolean) {
    dispatch(toggleAddProjectDialogAction(isOpen));
  }

  return (
    <ApplicationContext.Provider
      value={{
        applicationState,
        toggleAddProjectDialogIsOpen,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}
