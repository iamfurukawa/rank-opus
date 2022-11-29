import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { TaskList } from '../../business/tasks';

import styles from './rank.module.scss'
import { Person } from '../../business/people';
import { getAllParticipants } from '../../services/firestore';

interface RankRow {
    [key: string]: any;
}

const Rank = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const person: Person = state?.participant

    const [displayMyPosition, setDisplayMyPosition] = useState(false);
    const [rank, setRank] = useState<RankRow[]>([]);

    useEffect(() => {
        const participants = async () => {
            const participants = await getAllParticipants()

            var participantsRows = participants.map((person: any) => {
                const participant: RankRow = {
                    "id": person.id,
                    "pos": 0,
                    "image": person.id + '.jpg',
                    "name": person.name,
                    "pts": 0,
                }

                TaskList.forEach(task => {
                    const wasFinished = person.tasks.find((t: any) => t.id === task.code)?.wasFinished

                    participant['pts'] += wasFinished ? 5 : 0

                    participant[task.code] = wasFinished
                        ? <i style={{ color: 'green' }} className="pi pi-check" />
                        : <i style={{ color: 'grey' }} className="pi pi-times" />
                });

                return participant;
            })

            var uniquePts = _.chain(participantsRows)
                .map('pts')
                .uniq()
                .sortBy()
                .reverse()
                .value()

            participantsRows = _.chain(participantsRows)
                .map(participant => {
                    participant['pos'] = uniquePts.findIndex(pts => pts == participant['pts']) + 1
                    return participant
                })
                .sortBy('pos')
                .filter(row => parseInt(row['pts']) > 0)
                .filter(row => parseInt(row['pos']) < 4)
                .value()

            setRank(participantsRows)
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