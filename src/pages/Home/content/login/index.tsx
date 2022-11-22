import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import styles from './login.module.scss';

const Login = () => {
    const navigate = useNavigate()

    const [document, setDocument] = useState('');

    const signIn = () => {
        navigate('/', { state: { document } })
    }

    return (
        <div className={styles.content}>
            <h1>Login</h1>
            <div className={styles.group}>
                <h3>CPF</h3>
                <InputText className={styles.button} value={document} onChange={(e) => setDocument(e.target.value)} />
            </div>
            <Button onClick={signIn} label="Entrar" aria-label="Entrar" />

            <div className={styles.group}>
                <Link to="/register">
                    Quero registrar minha participação!
                </Link>
            </div>
        </div>
    )
}

export default Login