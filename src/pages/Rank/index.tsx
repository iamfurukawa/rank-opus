import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import ParticipantsManager, { RankRow } from '../../services/participants'

import { TaskList } from '../../business/tasks';
import { Person } from '../../business/people';

import styles from './rank.module.scss'

const Rank = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const person: Person = state?.participant

    const [displayMyPosition, setDisplayMyPosition] = useState(false);
    const [rank, setRank] = useState<RankRow[]>([]);

    useEffect(() => {
        const participants = async () => {
            const newRank = await ParticipantsManager.getParticipants();
            console.log(newRank.map((row: any) => row['name']))
            setRank(newRank)
        }

        participants()
    }, [])

    const nameBodyTemplate = (data: any) => {
        return (
            <>
                <div className={styles.user}>
                    <div className={styles.portrait}>
                        <img className={styles.avatar} src={`/people/images/${data.image}`} />
                    </div>
                    <span className="image-text">{data.name}</span>
                </div>
            </>
        );
    }

    return (
        <>
            <div className={styles.content}>
                <h1>Ranking</h1>
                <div className={styles.menu}>
                    <Button label="Novo Registro" onClick={() => navigate('/register')} className="p-button-success" />
                    {
                        person
                            ? <Button label="Minhas Participações" onClick={() => setDisplayMyPosition(!displayMyPosition)} className="p-button-success" />
                            : <Button label="Logar" onClick={() => navigate('/Login')} className="p-button-success" />
                    }
                </div>
                <DataTable value={rank} responsiveLayout="scroll">
                    <Column field="pos" header="Posição" align={'center'} />
                    <Column field="name" header="Nome" body={nameBodyTemplate} />
                    <Column field="pts" header="Pontos" align={'center'} />
                    {
                        TaskList.map(task => (<Column field={task.code} header={task.name} align={'center'} />))
                    }
                </DataTable>
            </div>
            <Dialog header="Minhas Participações" visible={displayMyPosition} position={'bottom'} modal onHide={() => setDisplayMyPosition(!displayMyPosition)}
                draggable={false} resizable={false}>
                <div className={styles.myRank}>
                    <h3>Player: {person?.name}</h3>
                    <h3>Participações</h3>
                    {
                        TaskList.map(task => {
                            const taskFounded = person?.tasks.find(personTask => personTask.id === task.code)
                            return (
                                <label>{
                                    taskFounded?.wasFinished
                                        ? <i style={{ color: 'green' }} className="pi pi-check" />
                                        : <i style={{ color: 'grey' }} className="pi pi-times" />
                                } - {task.name}</label>
                            )
                        })
                    }
                </div>
            </Dialog>
        </>
    )
}

export default Rank