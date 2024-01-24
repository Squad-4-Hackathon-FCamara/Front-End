import { Button } from '@mui/material'
import { main } from '@popperjs/core'
import './style.css';
import IMGLogin from './../../assets/images/img_login.svg'
export function Login() {
    return (
        <main> 
            <div id='img-container'>
                <img src={IMGLogin} alt="" />
            </div>

            <div id='login-container'>
                <h1>Entre no Orange Portfólio</h1>
                Formulário
            </div>
        </main>
    )
}
