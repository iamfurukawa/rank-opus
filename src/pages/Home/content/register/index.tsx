import { useRef, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Md5 } from 'ts-md5';

import { InputMask } from 'primereact/inputmask';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Toast } from 'primereact/toast';

import { TaskListSelect, Tasks } from '../../../../business/tasks';

import { getParticipant, updateParticipant } from '../../../../services/firestore';

import styles from './register.module.scss';

const Register = () => {
    const navigate = useNavigate()
    const toast = useRef<any>(null);

    const [document, setDocument] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Tasks | null>(null);
    const [loadingButton, setLoadingButton] = useState(false);

    const onTaskChange = (e: any) => setSelectedTask(e.value);

    const register = async () => {
        setLoadingButton(true)
        const documentClear = document?.replaceAll('-', '').replaceAll('.', '') ?? ""
        const documentMd5 = Md5.hashStr(documentClear)

        if (!selectedTask) {
            toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Selecione uma tarefa', life: 3000 });
        } else {
            if (documentClear && documentClear.length === 11) {
                try {
                    const selectedTaskSplit = selectedTask.code.split('-')

                    const { docs } = await getParticipant(documentMd5)
                    const participant = docs[0].data()

                    participant.tasks = participant.tasks.map(task => {
                        if (task.id === selectedTaskSplit[1])
                            if (selectedTaskSplit[0] === 'add')
                                task.wasFinished = true
                            else
                                task.wasFinished = false

                        return task
                    })


                    await updateParticipant(participant)

                    navigate('/', { state: { participant } })
                } catch (error) {
                    console.error(error)
                    toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Falha ao anotar', life: 3000 });
                }
            } else {
                toast.current.show({ severity: 'error', summary: 'Erro', detail: 'Preencha com o seu CPF', life: 3000 });
            }
        }
        setLoadingButton(false)
    }

    return (
        <div className={styles.content}>
            <Toast ref={toast} />
            <h1>Participação</h1>
            <div className={styles.group}>
                <h3>CPF</h3>
                <InputMask mask="999.999.999-99" className={styles.button} value={document ?? ""} onChange={(e) => setDocument(e.target.value)} />
                <h3>Tarefa</h3>
                <Dropdown style={{ width: '100%' }} value={selectedTask} options={TaskListSelect} onChange={onTaskChange} optionLabel="name" placeholder="Selecione uma tarefa" />
            </div>
            <Button onClick={register} label="Participei!" aria-label="Anotar!" loading={loadingButton} />

            <div className={styles.group}>
                <Link to="/login">
                    Quero ver minha classificação!
                </Link>
            </div>
        </div>
    )
}

export default Register