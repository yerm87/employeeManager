import {Component, OnInit} from '@angular/core';
import {EmployeeService} from './employee.service';
import {Employee} from './employee';
import {HttpErrorResponse} from '@angular/common/http';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employees: Employee[];
  editEmployee: Employee;
  deleteEmployee: Employee;

  constructor(private employeeService: EmployeeService){ }

  ngOnInit(): void {
    this.getAllEmployees();
  }

  private getAllEmployees(): void {
    this.employeeService.getAllEmployees()
      .subscribe(response => {
        this.employees = response;
      }, error => {
        alert(error.message);
      });
  }

  public onOpenModal(employee: Employee, modal: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (modal === 'add'){
      button.setAttribute('data-target', '#addModal');
    }
    if (modal === 'update'){
      this.editEmployee = employee;
      button.setAttribute('data-target', '#updateModal');
    }
    if (modal === 'delete'){
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteModal');
    }
    container.appendChild(button);
    button.click();
    container.removeChild(button);
  }

  addEmployee(addForm: NgForm): void {
    document.getElementById('add-employee-form').click();
    this.employeeService.addEmployee(addForm.value)
      .subscribe(response => {
        this.getAllEmployees();
        addForm.reset();
      }, error => {
        alert(error.message);
      });
  }

  updateEmployee(updateForm: NgForm): void {
    document.getElementById('update-employee').click();
    this.employeeService.updateEmployee(updateForm.value).subscribe(response => {
      this.getAllEmployees();
    }, error => {
      alert(error.message);
    });
  }

  removeEmployee(employeeId: number): void {
    this.employeeService.deleteEmployee(employeeId).subscribe(response => {
      this.getAllEmployees();
    }, error => {
      alert(error.message);
    });
  }

  searchEmployees(key: string): void {
    const filteredEmployees: Employee[] = [];

    for (const employee of this.employees){
      // tslint:disable-next-line:forin
      let match = false;
      // tslint:disable-next-line:forin
      for (const prop in employee){
        const value = employee[prop];
        const keyLowerCase = key.toLowerCase();
        const keyRegexBuilder = `[a-zA-Z0-9]*${keyLowerCase}[a-zA-Z0-9]*`;
        const regex = new RegExp(keyRegexBuilder);
        let valueToLowerCase = value;
        if(typeof value === 'string'){
          valueToLowerCase = valueToLowerCase.toLowerCase();
        }
        // @ts-ignore
        if (regex.test(valueToLowerCase)){
          match = true;
          break;
        }
      }
      if (match){
        filteredEmployees.push(employee);
        match = false;
      }
    }
    this.employees = filteredEmployees;
    if (key === null || key === ''){
      this.getAllEmployees();
    }
  }
}
