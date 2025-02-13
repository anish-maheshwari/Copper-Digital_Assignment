


import { Router} from "express";
const router = Router();
 import Task from '../models/noteModels.js';


import{getAlltasks,
    createTask,
    singleTask,
    editTask,
    deleteTask
} from "../controller/tasksController.js"

    import { validateTaskInput,validateIdParam } from "../middleware/validationMiddleware.js";




router.route('/').get(getAlltasks).post(validateTaskInput,createTask);
router.route('/:id').get(validateIdParam,singleTask)
.patch(validateIdParam,validateTaskInput,editTask)
.delete(validateIdParam,deleteTask);

export default router;