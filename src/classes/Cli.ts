import inquirer from 'inquirer';
import { QueryResult } from 'pg';
import { pool, connectToDb } from '../connection.js';

class Cli {
  exit: boolean = false;

  // Method to start the CLI
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message: 'What would you like to do?',
          choices: [
            'View All Employees', 
            'Add Employee', 
            'Update Employee Role', 
            'View All Roles', 
            'Add Role', 
            'View All Departments', 
            'Add Department', 
            'Quit'
          ]
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === 'View All Employees') {
          this.viewEmployees();
          }
        else if (answers.CreateOrSelect === 'Add Employee') {
          this.addEmployee();
          }
        else if (answers.CreateOrSelect === 'Update Employee Role') {
          this.updateEmployeeRole();
        }
        else if (answers.CreateOrSelect === 'View All Roles') {
          this.viewRoles();
        }
        else if (answers.CreateOrSelect === 'Quit') {
          this.quit();
        }
        else if (answers.CreateOrSelect === 'Add Role') {
          this.addRole();
        }
        else if (answers.CreateOrSelect === 'View All Departments') {
          this.viewDepartments();
        }
  })
  }
    // Method to view all employees
    private async viewEmployees(): Promise<void> {
      try {
        // Query to get all employees from the database
        const result: QueryResult = await pool.query('SELECT * FROM employee');
        const rows = result.rows;
  
        // Display employees in a table format in the terminal
        console.log('\nList of Employees:\n');
        console.table(rows);
  
        // After displaying, prompt the user for a new action
        this.startCli(); // Go back to the main menu after displaying
      } catch (error) {
        console.error('Error retrieving employees:', error);
      }
    }
    // Method to add an employee
    private async addEmployee(): Promise<void> {
      try {
        // Query to get all roles from the database
        const rolesResult: QueryResult = await pool.query('SELECT * FROM role');
        const roles = rolesResult.rows;
  
        // Query to get all employees from the database
        const employeesResult: QueryResult = await pool.query('SELECT * FROM employee');
        const employees = employeesResult.rows;
  
        // Prompt the user for the employee's information
        const answers = await inquirer.prompt([
          {
            type: 'input',
            name: 'first_name',
            message: "What is the employee's first name?",
          },
          {
            type: 'input',
            name: 'last_name',
            message: "What is the employee's last name?",
          },
          {
            type: 'list',
            name: 'role_id',
            message: "What is the employee's role?",
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
          {
            type: 'list',
            name: 'manager_id',
            message: "Who is the employee's manager?",
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
        ]);
  
        // Insert the new employee into the database
        await pool.query(
          'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)',
          [answers.first_name, answers.last_name, answers.role_id, answers.manager_id]
        );
  
        console.log('Employee added successfully!');
  
        // After adding, prompt the user for a new action
        this.startCli(); // Go back to the main menu after adding
      } catch (error) {
        console.error('Error adding employee:', error);
      }
    }
    // Method to update an employee's role
    private async updateEmployeeRole(): Promise<void> {
      try {
        // Query to get all employees from the database
        const employeesResult: QueryResult = await pool.query('SELECT * FROM employee');
        const employees = employeesResult.rows;
  
        // Query to get all roles from the database
        const rolesResult: QueryResult = await pool.query('SELECT * FROM role');
        const roles = rolesResult.rows;
  
        // Prompt the user for the employee to update and the new role
        const answers = await inquirer.prompt([
          {
            type: 'list',
            name: 'employee_id',
            message: 'Which employee would you like to update?',
            choices: employees.map((employee) => ({
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id,
            })),
          },
          {
            type: 'list',
            name: 'role_id',
            message: 'What is the employee\'s new role?',
            choices: roles.map((role) => ({
              name: role.title,
              value: role.id,
            })),
          },
        ]);
  
        // Update the employee's role in the database
        await pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [answers.role_id, answers.employee_id]);
  
        console.log('Employee role updated successfully!');
  
        // After updating, prompt the user for a new action
        this.startCli(); // Go back to the main menu after updating
      } catch (error) {
        console.error('Error updating employee role:', error);
      }
    }
      private async viewRoles(): Promise<void> {
        try {
          // Query to get all roles from the database
          const result: QueryResult = await pool.query('SELECT * FROM role');
          const rows = result.rows;
    
          // Display roles in a table format in the terminal
          console.log('\nList of Roles:\n');
          console.table(rows);
    
          // After displaying, prompt the user for a new action
          this.startCli(); // Go back to the main menu after displaying
        } catch (error) {
          console.error('Error retrieving roles:', error);
        }
      }
      private async addRole(): Promise<void> {
        try {
          // Query to get all departments from the database
          const departmentsResult: QueryResult = await pool.query('SELECT * FROM department');
          const departments = departmentsResult.rows;
    
          // Prompt the user for the role's information
          const answers = await inquirer.prompt([
            {
              type: 'input',
              name: 'title',
              message: "What is the role's title?",
            },
            {
              type: 'input',
              name: 'salary',
              message: "What is the role's salary?",
            },
            {
              type: 'list',
              name: 'department_id',
              message: "What is the role's department?",
              choices: departments.map((department) => ({
                name: department.name,
                value: department.id,
              })),
            },
          ]);
    
          // Insert the new role into the database
          await pool.query(
            'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)',
            [answers.title, answers.salary, answers.department_id]
          );
    
          console.log('Role added successfully!');
    
          // After adding, prompt the user for a new action
          this.startCli(); // Go back to the main menu after adding
        } catch (error) {
          console.error('Error adding role:', error);
        }
      }
      private async viewDepartments(): Promise<void> {
        try {
          // Query to get all departments from the database
          const result: QueryResult = await pool.query('SELECT * FROM department');
          const rows = result.rows;
    
          // Display departments in a table format in the terminal
          console.log('\nList of Departments:\n');
          console.table(rows);
    
          // After displaying, prompt the user for a new action
          this.startCli(); // Go back to the main menu after displaying
        } catch (error) {
          console.error('Error retrieving departments:', error);
        }
      }

  // Quit method
  quit(): void {
    console.log('Goodbye!');
    this.exit = true;
    process.exit();
  }
}

// Export the Cli class
export default Cli;