import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

import { TaskList } from '../../business/tasks';

import styles from './rank.module.scss'

const Rank = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { document } = state;
    const [displayMyPosition, setDisplayMyPosition] = useState(false);

    const rank =
        [
            { "id": "1000", "pos": 1, "name": "Bamboo Watch", "image": 'nadal.jpg', "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> },
            { "id": "1001", "pos": 1, "name": "Black Watch", "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> },
            { "id": "1002", "pos": 2, "name": "Blue Band", "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> },
            { "id": "1003", "pos": 2, "name": "Blue T-Shirt", "pts": "20", "tetris": <i style={{ color: 'red' }} className="pi pi-times" /> },
            { "id": "1004", "pos": 2, "name": "Bracelet", "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> },
            { "id": "1005", "pos": 3, "name": "Brown Purse", "pts": "20", "tetris": <i style={{ color: 'red' }} className="pi pi-times" /> },
            { "id": "1006", "pos": 3, "name": "Chakra Bracelet", "pts": "20", "tetris": <i style={{ color: 'red' }} className="pi pi-times" /> },
            { "id": "1007", "pos": 3, "name": "Galaxy Earrings", "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> },
            { "id": "1008", "pos": 3, "name": "Game Controller", "pts": "20", "tetris": <i style={{ color: 'red' }} className="pi pi-times" /> },
            { "id": "1009", "pos": 3, "name": "Gaming Set", "pts": "20", "tetris": <i style={{ color: 'green' }} className="pi pi-check" /> }
        ]

    const nameBodyTemplate = (data: any) => {
        return (
            <>
                <img alt={data.image} src={data.image ? `/people/images/${data.image}` : `/people/images/default.png`} width={32} style={{ verticalAlign: 'middle', borderRadius: '50%', marginRight: "10px" }} />
                <span className="image-text">{data.name}</span>
            </>
        );
    }

    return (
        <>
            <div className={styles.content}>
                <h1>Ranking</h1>
                <div className={styles.menu}>
                    <Button label="Novo Registro" onClick={() => navigate('/register')} className="p-button-success" />
                    <Button label="Minhas Participações" onClick={() => setDisplayMyPosition(!displayMyPosition)} className="p-button-success" />
                </div>
                <DataTable value={rank} responsiveLayout="scroll">
                    <Column field="pos" header="Posição" />
                    <Column field="name" header="Nome" body={nameBodyTemplate} />
                    <Column field="pts" header="Pontos" />
                    {
                        TaskList.map(task => (<Column field={task.id} header={task.name} />))
                    }
                </DataTable>
            </div>
            <Dialog header="Minhas Participações" visible={displayMyPosition} position={'bottom'} modal onHide={() => setDisplayMyPosition(!displayMyPosition)}
                draggable={false} resizable={false}>
                <div className={styles.myRank}>
                    <h3>Player: Vinícius Furukawa Carvalho</h3>
                    <h3>Participações</h3>
                    {
                        TaskList.map(task => (<label>{task.name} - <i style={{ color: 'green' }} className="pi pi-check" /></label>))
                    }
                </div>
            </Dialog>
        </>
    )
}

export default Rank