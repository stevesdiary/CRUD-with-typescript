import express from 'express';
import EmployeeController from '../controllers/EmployeeController';
const router = express.Router();

import registerController from "../controllers/registerController";

router.post("/register", registerController.register);

router.post("/login", registerController.loginUser);

router.get('/', EmployeeController.getAllEmployee);

router.post('/employee', EmployeeController.createEmployee);

router.get('/employee/:id', EmployeeController.getEmployee);

router.put('/:id', EmployeeController.updateEmployee );

router.delete('/:id', EmployeeController.deleteEmployee);

export default router;