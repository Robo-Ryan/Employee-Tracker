INSERT INTO department (name) VALUES
('Engineering'),
('Sales'),
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 100000, 1),
('Senior Software Engineer', 120000, 1),
('Sales Lead', 80000, 2),
('Salesperson', 60000, 2),
('Accountant', 85000, 3),
('Legal Team Lead', 75000, 4),
('Lawyer', 120000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashley', 'Rodriguez', 3, 1),
('Kevin', 'Tupik', 4, 3),
('Malia', 'Brown', 5, 3),
('Sarah', 'Lourd', 6, 4),
('Tom', 'Allen', 7, 4);