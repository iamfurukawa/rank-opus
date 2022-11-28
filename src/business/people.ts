import { UserTasks } from "./tasks";

export interface Person {
    id: string;
    name: string;
    tasks: UserTasks[];
}