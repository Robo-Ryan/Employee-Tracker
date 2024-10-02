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
          console.log('add employee');
          }
        else if (answers.CreateOrSelect === 'Update Employee Role') {
          console.log('update employee role');
        }
        else if (answers.CreateOrSelect === 'View All Roles') {
          console.log('view all roles');
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

  // // Method to view all employees
  // async viewEmployees(): Promise<void> {
  //   try {
  //     // Query to get all employees from the database
  //     const result: QueryResult = await pool.query('SELECT * FROM employee');
  //     const rows = result.rows;

  //     // Display employees in a table format in the terminal
  //     console.log('\nList of Employees:\n');
  //     console.table(rows);

  //     // After displaying, prompt the user for a new action
  //     this.startCli(); // Go back to the main menu after displaying
  //   } catch (error) {
  //     console.error('Error retrieving employees:', error);
  //   }
  // }
  //   try {
  //     // Query to get all employees from the database
  //     const result = await pool.query('SELECT * FROM employee');
  //     const rows = result.rows;

  //     // Display employees in a table format in the terminal
  //     console.log('\nList of Employees:\n');
  //     console.table(rows);

  //     // Prompt the user to select a new action after viewing employees
  //     this.startCli();

  //   } catch (error) {
  //     console.error('Error retrieving employees:', error);
  //   }
  // }

  // Quit method
  quit(): void {
    console.log('Goodbye!');
    this.exit = true;
    process.exit();
  }
}

// Export the Cli class
export default Cli;