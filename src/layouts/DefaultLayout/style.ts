import styled from "styled-components";

export const LayoutContainer = styled.main`
  background: ${(props) => props.theme["color-neutral-60"]};
  display: flex;
  flex-direction: column;
`;

export const Spacer = styled.div`
  min-height: 73px;
`;
