import express from 'express';
import EmployeeController from '../controllers/employeeController';
const router = express.Router();

router.get('/', EmployeeController.getAllEmployee);
router.post('/employee', EmployeeController.createEmployee);
router.get('/employee/:id', EmployeeController.getEmployee);
// router.post('/employee', EmployeeController.createEmployee);

// router.get('/employees', EmployeeController.getAllEmployees);

// router.get('/:id', EmployeeController.getEmployee );

// router.put('/:id', employeeController.updateEmployee);

// router.put('/:id', employeeController.gEmployee );

export default router;