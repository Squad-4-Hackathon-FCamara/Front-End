
import IMGLogin from './../../assets/images/img_login.svg'
import { ImageContainer, LoginContainer, MainWrapper } from './style';

export function Login() {
    return (
        <MainWrapper> 
            <ImageContainer>
                <img src={IMGLogin} alt="" />
            </ImageContainer>

            <LoginContainer>
                <h1>Entre no Orange Portfólio</h1>
                Formulário
            </LoginContainer>
        </MainWrapper>
    )
}
