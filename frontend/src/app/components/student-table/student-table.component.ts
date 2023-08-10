import { Component, OnInit } from '@angular/core';
import { Router,NavigationExtras } from '@angular/router';
import { faTrash, faPlus, faPenSquare } from '@fortawesome/free-solid-svg-icons';
import {AppServiceService} from '../../app-service.service';
@Component({
  selector: 'app-student-table',
  templateUrl: './student-table.component.html',
  styleUrls: ['./student-table.component.css']
})
export class StudentTableComponent implements OnInit {

  faTrash = faTrash;
  faPlus = faPlus;
  faPenSquare = faPenSquare;
  studentData: any;
  selected: any;

  constructor(private service : AppServiceService, private router: Router) { }

  ngOnInit(): void {
    this.getStudentData();
  }

  addNewStudent(){
    this.router.navigate(['addStudent'])
  }

  editStudent(id){
    const navigationExtras: NavigationExtras = {
      state: {
        id : id
      }
    };
    this.router.navigate(['editStudent'], navigationExtras )
  }

  getStudentData(){
    this.service.getStudentData().subscribe((response)=>{
      this.studentData = Object.keys(response).map((key) => [response[key]]);
    },(error)=>{
      console.log('ERROR - ', error)
    })
  }

  deleteStudent(itemid){
    const student = {
      id: itemid
    }
    this.service.deleteStudent(student).subscribe((response)=>{
      this.getStudentData()
    })
  }
 //search
 search(value: string) {
  let foundItems = [];

  if (value.trim().length <= 0) {
    this.getStudentData();
  } else {
    let filteredData = this.studentData.filter((student) => {
      let fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
      let searchValue = value.toLowerCase();

      if (fullName.includes(searchValue)) {
        foundItems.push(student);
        return true;
      }

      let nameParts = fullName.split(' ');
      for (let i = 0; i < nameParts.length; i++) {
        if (nameParts[i].startsWith(searchValue) || nameParts[i].endsWith(searchValue) || nameParts[i].includes(searchValue)) {
          foundItems.push(student);
          return true;
        }
      }

      return false;
    });

    this.studentData = filteredData;
  }
 }
}
