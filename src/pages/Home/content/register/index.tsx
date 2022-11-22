import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import styles from './register.module.scss';

const Register = () => {
    const navigate = useNavigate()

    const [document, setDocument] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState(null);

    const tasks = [
        { name: 'Tetris', code: 'tetris' },
        { name: 'Tarefa 2', code: 'tarefa2' },
        { name: 'Tarefa 3', code: 'tarefa3' },
        { name: 'Tarefa 4', code: 'tarefa4' },
        { name: 'Tarefa 5', code: 'tarefa5' }
    ];

    const onTaskChange = (e) => {
        setSelectedTask(e.value);
    }

    const register = () => {
        navigate('/', { state: { document } })
    }

    return (
        <div className={styles.content}>
            <h1>Participação</h1>
            <div className={styles.group}>
                <h3>CPF</h3>
                <InputText className={styles.button} value={document} onChange={(e) => setDocument(e.target.value)} />
                <h3>Tarefa</h3>
                <Dropdown style={{ width: '100%' }} value={selectedTask} options={tasks} onChange={onTaskChange} optionLabel="name" placeholder="Selecione uma tarefa" />
            </div>
            <Button onClick={register} label="Participei!" aria-label="Participei!" />

            <div className={styles.group}>
                <Link to="/login">
                    Quero ver minha classificação!
                </Link>
            </div>
        </div>
    )
}

export default Register