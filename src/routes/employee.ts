import express from 'express';
import EmployeeController from '../controllers/EmployeeController';
const router = express.Router();
import {authentication, verifyUser} from "../middlewares/authentication";

router.get('/', authentication, verifyUser('user', 'admin'), EmployeeController.getAllEmployee);

router.post('/employee', authentication, verifyUser('admin'), EmployeeController.createEmployee);

router.get('/employee/:id', authentication, verifyUser('user', 'admin'), EmployeeController.getEmployee);

router.put('/:id', authentication, verifyUser('user', 'admin'), EmployeeController.updateEmployee );

router.delete('/:id', authentication, verifyUser('admin'), EmployeeController.deleteEmployee);

export default router;