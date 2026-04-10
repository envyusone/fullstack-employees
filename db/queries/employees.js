import client from "../client.js";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
  // TODO
try {
    // 1. Write the SQL query with placeholders ($1, $2, $3)
    const sql = `
      INSERT INTO employees (name, birthday, salary)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    // 2. Execute the query with the provided values
    const { rows } = await client.query(sql, [name, birthday, salary]);
    // 3. Return the created employee
    return rows[0];

  } catch (error) {
    console.error("Error creating employee:", error);
    throw error;
  }
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  // TODO
  const { rows } = await client.query("SELECT * FROM employees;");
  return rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  // TODO
  const { rows: [employee] } = await client.query(
    "SELECT * FROM employees WHERE id = $1;",
    [id]
  );
  return employee;
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  // TODO
  const { rows: [employee] } = await client.query(
    `UPDATE employees 
     SET name = $2, birthday = $3, salary = $4 
     WHERE id = $1 
     RETURNING *;`,
    [id, name, birthday, salary]
  );
  return employee;
}

/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  // TODO
  const { rows: [employee] } = await client.query(
    "DELETE FROM employees WHERE id = $1 RETURNING *;",
    [id]
  );
  return employee;
}
