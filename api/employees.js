import { Router } from "express";
const router = Router();
import { 
  getEmployees, 
  getEmployee, 
  createEmployee, 
  updateEmployee, 
  deleteEmployee 
} from "../db/queries/employees.js";

// GET / - Welcome message
router.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// GET /employees - sends array of all employees
router.get("/employees", async (req, res, next) => {
  try {
    const employees = await getEmployees();
    res.json(employees);
  } catch (err) {
    next(err);
  }
});

// GET /employees/:id - sends employee with specified ID
router.get("/employees/:id", async (req, res, next) => {
  try {
    const employee = await getEmployee(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee does not exist.");
    }
    res.json(employee);
  } catch (err) {
    next(err);
  }
});

// POST /employees - creates new employee
router.post("/employees", async (req, res, next) => {
  try {
    // Check if body exists before destructuring to avoid 500 errors
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is not provided.");
    }

    const { name, birthday, salary } = req.body;

    // Check for required fields
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing a required field.");
    }

    const newEmployee = await createEmployee({ name, birthday, salary });
    res.status(201).json(newEmployee);
  } catch (err) {
    next(err);
  }
});

// DELETE /employees/:id - deletes specified employee
router.delete("/employees/:id", async (req, res, next) => {
  try {
    const employee = await deleteEmployee(req.params.id);
    if (!employee) {
      return res.status(404).send("Employee does not exist.");
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

// PUT /employees/:id - updates employee with specified ID
router.put("/employees/:id", async (req, res, next) => {
  try {
    // Check if body exists
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).send("Request body is not provided.");
    }

    const { name, birthday, salary } = req.body;

    // Check for required fields
    if (!name || !birthday || !salary) {
      return res.status(400).send("Missing a required field.");
    }

    const updatedEmployee = await updateEmployee({ 
      id: req.params.id, 
      name, 
      birthday, 
      salary 
    });

    if (!updatedEmployee) {
      return res.status(404).send("Employee does not exist.");
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    next(err);
  }
});

export default router;
