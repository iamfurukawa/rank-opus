export interface Tasks {
    code: string;
    name: string;
    canShow: boolean;
}

export interface UserTasks {
    id: string;
    wasFinished: boolean;
}

export const TaskList: Tasks[] = [
    { code: 'padrao', name: 'Está na festa!', canShow: true },
    { code: 'tetris', name: 'Tetris', canShow: true },
    { code: 'tarefa2', name: 'Gartic Phone', canShow: true },
    { code: 'tarefa3', name: 'Bingo', canShow: true },
    { code: 'tarefa4', name: '...', canShow: true },
]

export const TaskListSelect: Tasks[] = [
    ...TaskList.filter(task => task.canShow).map(task => ({
        ...task, 'code': `add-${task.code}`, 'name': `Participei da ${task.name}`
    })),
    ...TaskList.filter(task => task.canShow)
        .map(task => ({
            ...task, 'code': `remove-${task.code}`, 'name': `Não participei da ${task.name}`
        })),
]