import { initializeApp } from 'firebase/app'

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

export const getAllParticipants = async () => getDocs(query(participantsCol))

