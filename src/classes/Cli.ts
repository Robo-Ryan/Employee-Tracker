// importing classes from other files
import inquirer from "inquirer";

// define the Cli class
class Cli {
  exit: boolean = false;

  //PROPERTIES
  //CONSTRUCTOR
  //METHODS


  // method to create a motorbike
  // createMotorbike(): void {
  //   inquirer
  //     .prompt([
  //       {
  //         type: 'input',
  //         name: 'color',
  //         message: 'Enter Color',
  //       },
  //     ])
  //     .then((answers) => {
  //       // const motorbike = new Motorbike(
  //       // answers.color,
  //       // parseInt(answers.topSpeed),
  //       // [],
  //       // )

  //       // push the motorbike to the vehicles array
  //       // perform actions on the motorbike
  //       this.performActions();
  //     });

  // method to start the cli
  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'What would you like to do?',
          choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
        },
      ])

      // //METHODS
      // const viewEmployees =>{

      // }

      // .then((answers) => {
      //   // check if the user wants to create a new vehicle or select an existing vehicle
      //   if (answers.CreateOrSelect === 'View All Employees') {
      //     this.viewEmployees();
      //   } else if (answers.CreateOrSelect === 'Add Employee') {
      //     this.addEmployee();
      //   } else if (answers.CreateOrSelect === 'Update Employee Role') {
      //     this.updateEmployeeRole();
      //   } 
      //   else if (answers.CreateOrSelect === 'View All Roles') {
      //     this.viewAllRoles();
      //   } 
      //   else if (answers.CreateOrSelect === 'Add Role') {
      //     this.addRole();
      //   } 
      //   else if (answers.CreateOrSelect === 'View all Departments') {
      //     this.viewDepartments();
      //   } else if (answers.CreateOrSelect === 'Add Department') {
      //     this.addDepartment();
      //   } 
      //   else if (answers.CreateOrSelect === 'Quit') {
      //     this.quit();
      //   } 
      // });
  }
}

// export the Cli class
export default Cli;
