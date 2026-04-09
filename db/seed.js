import fs from "node:fs"; 
import db from "#db/client";
import { createEmployee } from "./queries/employees.js";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  // TODO
  try {
    // 1. Read the schema.sql file and execute it to create the table
    const sql = fs.readFileSync("db/schema.sql", "utf8");
    await db.query(sql);

    // 2. Define 10 employees to seed
    const employees = [
      { name: "Jimi Hendrix", birthday: "1942-11-27", salary: 90000 },
      { name: "Janis Joplin", birthday: "1943-01-19", salary: 85000 },
      { name: "Jim Morrison", birthday: "1943-12-08", salary: 80000 },
      { name: "Kurt Cobain", birthday: "1967-02-20", salary: 95000 },
      { name: "Amy Winehouse", birthday: "1983-09-14", salary: 88000 },
      { name: "Brian Jones", birthday: "1942-02-28", salary: 75000 },
      { name: "Jean-Michel Basquiat", birthday: "1960-12-22", salary: 120000 },
      { name: "Robert Johnson", birthday: "1911-05-08", salary: 70000 },
      { name: "Heath Ledger", birthday: "1979-04-04", salary: 110000 },
      { name: "Tupac Shakur", birthday: "1971-06-16", salary: 100000 }
    ];

    // 3. Map through the array 
    await Promise.all(employees.map(createEmployee));

    console.log("Successfully created 10 employees!");
  } catch (error) {
    console.error("Error seeding employees:", error);
  }
}

