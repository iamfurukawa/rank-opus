export interface Tasks {
    code: string;
    name: string;
    alias: string;
    canShow: boolean;
}

export interface UserTasks {
    id: string;
    wasFinished: boolean;
}

export const TaskList: Tasks[] = [
    { code: 'padrao', alias: 'da festa', name: 'Está na festa!', canShow: true },
    { code: 'tetris', alias: 'do Tetris', name: 'Tetris', canShow: true },
    { code: 'tarefa2', alias: 'do Quebra Gelo', name: 'Quebra Gelo', canShow: true },
    { code: 'tarefa3', alias: 'do Bingo', name: 'Bingo', canShow: true },
    { code: 'tarefa4', alias: 'do ...', name: '...', canShow: true },
]

export const TaskListSelect: Tasks[] = [
    ...TaskList.filter(task => task.canShow).map(task => ({
        ...task, 'code': `add-${task.code}`, 'name': `Participei ${task.alias}`
    })),
    ...TaskList.filter(task => task.canShow)
        .map(task => ({
            ...task, 'code': `remove-${task.code}`, 'name': `Não participei ${task.alias}`
        })),
]