# -*- coding: utf-8 -*-

import csv
import firebase_admin
from firebase_admin import credentials, firestore
import hashlib

cred = credentials.Certificate("credentials.json")
app = firebase_admin.initialize_app(cred)
db = firestore.client()
collectionRef = db.collection('participants')

taskList = [
    {'id': 'padrao', 'wasFinished': True},
    {'id': 'tetris', 'wasFinished': False},
    {'id': 'tarefa2', 'wasFinished': False},
    {'id': 'tarefa3', 'wasFinished': False},
    {'id': 'tarefa4', 'wasFinished': False},
    {'id': 'tarefa5', 'wasFinished': False},
]


def insert(name, document):
    print('{} - {} - {}'.format(name, document, md5(document)))

    collectionRef.document(md5(document)).set({
        'id': md5(document),
        'name': name,
        'tasks': taskList
    })


def md5(str):
    return hashlib.md5(str.encode('utf-8')).hexdigest()


def readAndInsert():
    with open('C:/Users/vinicius.carvalho/Downloads/CPFS/cpf_fest_final_ano.csv') as csvfile:
        reader = csv.reader(csvfile, delimiter=';')
        for row in reader:
            insert(row[0], row[1].replace('.', '').replace('-', ''))


readAndInsert()
