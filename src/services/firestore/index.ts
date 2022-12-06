import { initializeApp } from 'firebase/app'
import ls from 'localstorage-slim'

import {
    getFirestore,
    CollectionReference,
    collection,
    DocumentData,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    documentId
} from 'firebase/firestore'

import { Person } from '../../business/people';

export const firebaseApp = initializeApp({
    apiKey: "AIzaSyA0nEg87NZN9KMWQ3aJIHuP7rg_3HLkBWc",
    authDomain: "opus-rank.firebaseapp.com",
    projectId: "opus-rank",
    storageBucket: "opus-rank.appspot.com",
    messagingSenderId: "320063686482",
    appId: "1:320063686482:web:0ab521e5d0f7e6cf415c8b"
})

export const firestore = getFirestore()

const PARTICIPANTS = 'participants'

const MINUTE = 60

const createCollection = <T = DocumentData>(collectionName: string) => collection(firestore, collectionName) as CollectionReference<T>

const participantsCol = createCollection<Person>(PARTICIPANTS)

/*
    Person Repository
*/

export const updateParticipant = async (person: Person) => updateDoc(doc(firestore, PARTICIPANTS, person.id), { ...person })

export const getParticipant = async (id: string) =>
    getDocs(query(
        participantsCol,
        where(documentId(), "==", id)
    ))

export const getAllParticipants = async (reset: boolean = false) => {

    if(reset) ls.remove(PARTICIPANTS)

    const participants = ls.get(PARTICIPANTS)
    if (participants !== null) {
        console.log('From cache')
        return JSON.parse(String(participants))
    }

    console.log('From firebase')

    const { docs } = await getDocs(query(participantsCol));
    const documents = docs.map(doc => doc.data())

    ls.set(PARTICIPANTS, JSON.stringify(documents), { ttl: 15 * MINUTE })
    return documents;
}
