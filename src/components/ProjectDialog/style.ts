import styled from 'styled-components'

export const DialogContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;
  padding: 24px 32px;
  width: 100%;

  h5 {
    color: ${(props) => props.theme['color-neutral-110']};

    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
    text-align: start;

    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    padding: 16px 24px;
  }
`

export const FormWrapper = styled.div`
  display: flex;
  gap: 24px;

  p {
    color: ${(props) => props.theme['color-neutral-110']};

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;

    margin-bottom: 16px;
  }

  #fields-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  #image-input {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`

export const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 91px 60px;
  cursor: default;

  width: 389px;
  height: 309px;
  border-radius: 4px;
  background-color: ${(props) => props.theme['color-neutral-70']};

  img {
    width: 46px;
    height: 46px;
    margin-bottom: 20px;
  }

  p {
    color: ${(props) => props.theme['color-neutral-120']};

    font-family: 'Roboto', sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 14px;
    letter-spacing: 0.25px;

    opacity: 0.6;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 91px 2px 91px 6px;
  }
`

interface ThumbnailPreviewProps {
  $url: string
}

export const ThumbnailPreview = styled.div<ThumbnailPreviewProps>`
  background-image: url(${(props) => props.$url});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: default;

  width: 389px;
  height: 309px;
  border-radius: 4px;
  background-color: ${(props) => props.theme['color-neutral-70']};

  @media (max-width: 768px) {
    width: 100%;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 389px;

  p {
    color: ${(props) => props.theme['color-neutral-110']};

    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15px;

    margin: 16px 0;
    cursor: pointer;
    transition: color 0.2s;
  }

  p:hover {
    color: ${(props) => props.theme['color-neutral-100']};
  }

  #form-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #delete-image {
    color: ${(props) => props.theme['color-neutral-110']};
  }

  #action-button {
    background: ${(props) => props.theme['color-secondary-100']};
    transition: background-color 0.2s;
    margin-right: 16px;
  }

  #action-button:hover {
    background: ${(props) => props.theme['color-secondary-110']};
  }

  @media (max-width: 768px) {
    margin-bottom: 167px;
    width: 100%;
  }
`
