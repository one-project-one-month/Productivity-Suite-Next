
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { DescriptionDialog } from "./description-dialog"
import { StatusDropdown } from "./status-dropdown"
import { ActionDropdown } from "./action-dropdown"
import { cn } from "@/lib/utils"
import { DisplayTodo } from "@/app/to-do/page"

type TodoTableProps = {
    todos: DisplayTodo[]
}

const TodoTable = ({ todos }: TodoTableProps) => {
    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow className="font-bold">
                        <TableCell className="py-4">ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>DueAt</TableCell>
                        <TableCell>Priority</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>StatusACtion</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {todos.length > 0 ? todos.map((todo: any) => (
                        <TableRow key={todo.id}>
                            <TableCell className="py-4">{todo.id}</TableCell>
                            <TableCell>{todo.title}</TableCell>
                            <TableCell><DescriptionDialog title={todo.title} description={todo.description} /></TableCell>
                            <TableCell>{new Date(todo.dueAt).toLocaleDateString()}</TableCell>
                            <TableCell>{todo.priority}</TableCell>
                            <TableCell className={cn("px-2 py-1 rounded font-medium",
                                todo.status === "PENDING" && "text-yellow-500",
                                todo.status === "COMPLETED" && "text-green-500",
                                todo.status === "OVERDUE" && "text-red-500"
                            )}>
                                {todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}
                            </TableCell>
                            <TableCell><StatusDropdown id={todo.id} currentStatus={todo.status} /></TableCell>
                            <TableCell><ActionDropdown todo={todo} /></TableCell>
                        </TableRow>
                    )) : <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center text-red-400">
                            There is no task yet!.
                        </TableCell>
                    </TableRow>
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default TodoTable
