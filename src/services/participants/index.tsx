import { getAllParticipants } from "../firestore";

import { TaskList } from "../../business/tasks";

import _ from 'lodash';

export interface RankRow {
    [key: string]: any;
}

const ParticipantsManager = () => {

    const getParticipants = async () => {
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

        return participantsRows;
    }

    return {
        getParticipants
    }
}

export default ParticipantsManager()