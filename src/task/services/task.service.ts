import { TaskDTO } from "../models/task.dto";
import { TaskCreateError, TaskDeleteError, TaskReadError, TaskUpdateError, TasksReadError } from "../errors/task.errors";
import { TParam, deleteTask, getTaskById, getTasks, saveTask, updateTask } from "../repositories/task.repository";

export const createTask = async (newTask: TaskDTO): Promise<void> => {
    try {
        await saveTask(newTask);
    } catch(e){
        throw new TaskCreateError();
    }
}

export const readTask = async (id_task: string): Promise<TaskDTO> => {
    const task = await getTaskById(id_task);

    if(task) {
        return task;
    } else {
        throw new TaskReadError();
    }
}


export const readTasks = async (param: TParam): Promise<TaskDTO[]> => {
    const tasks = await getTasks(param);

    if(tasks) {
        return tasks;
    } else {
        throw new TasksReadError();
    }
}


export const changeTask = async(changedTask: TaskDTO): Promise<void> => {
    try {
        await updateTask(changedTask);
    } catch {
        throw new TaskUpdateError();
    }
}


export const removeTask = async(id_task: string): Promise<void> => {
    const task = await deleteTask(id_task);

    if(!task) {
        throw new TaskDeleteError();
    }
}