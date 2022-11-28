import { useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Md5 } from 'ts-md5';

import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

import { getParticipant } from '../../../../services/firestore';

import styles from './login.module.scss';

const Login = () => {
    const navigate = useNavigate()
    const toast = useRef<any>(null);

    const [loadingButton, setLoadingButton] = useState(false);
    const [document, setDocument] = useState('');

    const signIn = async () => {
        setLoadingButton(true)
        const documentClear = document.replaceAll('-', '').replaceAll('.', '')
        const documentMd5 = Md5.hashStr(documentClear)

        if (documentClear && documentClear.length === 11) {
            try {
                const { docs } = await getParticipant(documentMd5)
                const participant = docs[0].data()

                navigate('/', { state: { participant } })
            } catch (error) {
                console.error(error)
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Não foi possível logar', life: 3000 });
            }
        } else {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Preencha com o seu CPF', life: 3000 });
        }
        setLoadingButton(false)
    }


    return (
        <div className={styles.content}>
            <Toast ref={toast} />
            <h1>Login</h1>
            <div className={styles.group}>
                <h3>CPF</h3>
                <InputMask mask="999.999.999-99" className={styles.button} value={document ?? ""} onChange={(e) => setDocument(e.target.value)} />
            </div>
            <Button onClick={signIn} label="Entrar" aria-label="Entrar" loading={loadingButton} />

            <div className={styles.group}>
                <Link to="/register">
                    Quero registrar minha participação!
                </Link>
            </div>
        </div>
    )
}

export default Login