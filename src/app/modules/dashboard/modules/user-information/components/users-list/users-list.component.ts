import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { IUser } from 'src/app/core/Models/iuser';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';


import { FormBuilder } from '@angular/forms';
import { IAccount } from '../../models/IAccount';
import { IHeader, paginationState } from 'src/app/core/Models';

import { Paginator } from 'primeng/paginator';
import { paginationInitialState } from 'src/app/core/classes/filtration';
import { UserService } from 'src/app/core/services/user.service';



@Component({
  selector: 'app-view-list-of-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class ViewListOfUsersComponent implements OnInit {
  isLoaded = false;
  searchKey: string = '';
  first = 0;
  rows = 4;
  usersList: IUser[] = [];
  faEllipsisVertical = faEllipsisVertical;
  cities: string[];
  @Input('filterFormControls') formControls:string[] =[]

  showFilterBox = false
  searchText=""

  showFilterModel=false

  filterForm
  @ViewChild('pagination') pagination: Paginator;
  page: number = 1;

  pagesArrOptions = []
  totalItems: number = 1;
  currentActivePage = { page: 1 }
  paginationState: paginationState = { ...paginationInitialState }

  pageNum = 1;
  pageSize = 50;
  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };


  constructor(private headerService: HeaderService, private translate: TranslateService,
    private router: Router, private userInformation: UserService,private fb:FormBuilder) { }
  users_List: IAccount[] = [];

  getUsersList(search = '', sortby = '', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = ''){
    this.userInformation.getUsersList(search, sortby, pageNum, pageSize).subscribe(response => {
      this.users_List = response?.data;
      this.isLoaded = true;
      console.log(  this.users_List )
    })
  }
  pageChanged(event: any) {
    this.pageNum = event.page;
  }


  ngOnInit(): void {
    this.initForm();
    this.getUsersList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('dashboard.UserInformation.List Of Users'), routerLink: '/dashboard/manager-tools/user-information/users-list' ,routerLinkActiveOptions:{exact: true}},
          // { label: this.translate.instant('dashboard.UserInformation.List Of Users') }
        ],
      }
    );


  }

  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }

  initForm(){
    this.filterForm= this.fb.group(()=>{
      let formGroup={}
      this.formControls.forEach(item =>{

        formGroup[item] =[]
      })
      return formGroup
    })

    // let formGroup={}
    // this.formControls.forEach(item =>{

    //   formGroup[item] =[]
    // })
    // console.log(formGroup);
    // return formGroup
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getUsersList(searchData, '', 1, 50, '', "asc");
  }

  submitForm(){
    this.showFilterModel = false
  }

  clearForm(){
    this.showFilterModel = false

  }


}





// getAssignmentList(search = '', sortby = '', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = '') {
//   this.assignmentservice.getAssignmentList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {

//     this.assignmentList = response?.data;
//     this.totalItems = this.assignmentList.length;
//     this.isLoaded = true;
//   })

// }

