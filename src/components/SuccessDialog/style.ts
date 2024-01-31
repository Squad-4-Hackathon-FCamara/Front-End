import styled from "styled-components";

export const DialogWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 48px;
  width: 351px;

  h1 {
    color: ${(props) => props.theme["color-neutral-110"]};
    text-align: center;

    font-family: "Roboto", sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
  }

  img {
    width: 40px;
    height: 40px;
    margin: 24px 0 24px 0;
  }

  #close-button {
    background-color: ${(props) => props.theme["color-secondary-100"]};
    height: 42px;
    transition: background-color 0.2s;
  }

  #close-button:hover {
    background-color: ${(props) => props.theme["color-secondary-110"]};
  }

  @media (max-width: 768px) {
    padding: 32px 28px;
    width: 100%;
  }
`;
