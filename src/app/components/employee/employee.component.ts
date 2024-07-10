import { Component, OnInit, ViewChild } from '@angular/core';
import { Todo } from './todo';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { CheckboxChangeEvent } from 'primeng/checkbox';


@Component({
  selector: 'employee-root',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('todoTask') todoTask: any;

  task = '';
  todos: Todo[] = [];

  constructor(private EmployeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    // this.EmployeeService.getTodoList().subscribe(
    //   response => {
    //     this.todos = response;
    //   }
    // )
  }

  updateTodo(e: CheckboxChangeEvent, todo: Todo) {
    this.EmployeeService.updateTodo({ ...todo, completed: e.checked }).subscribe(
      response => console.log(response)
    )
  }

  deleteTodo(e: unknown, id: Todo['id']) {
    this.EmployeeService.deleteTodo(id).subscribe(
      response => this.getList()
    )
  }

  addTodo() {
    this.EmployeeService.addTodo({ task: this.task, completed: false }).subscribe(
      response => {
        this.todoTask.reset();
        this.getList();
      }
    )
  }
}
