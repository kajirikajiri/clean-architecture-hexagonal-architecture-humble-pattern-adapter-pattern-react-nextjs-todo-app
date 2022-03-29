import { Cookie } from "core/usecases/repositories/cookie"

const createTodo = (r: Cookie) => {
    r.c.get("todo")
}