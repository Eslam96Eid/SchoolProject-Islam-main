import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Paginator } from 'primeng/paginator';
import { paginationInitialState } from 'src/app/core/classes/filtration';
import { IHeader, paginationState } from 'src/app/core/Models';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { AssessmentService } from '../../../assessment/service/assessment.service';
import { Iassignments } from '../model/Iassignments';


@Component({
  selector: 'app-assignments-list',
  templateUrl: './assignments-list.component.html',
  styleUrls: ['./assignments-list.component.scss']
})
export class AssignmentsListComponent implements OnInit {

  @ViewChild('pagination') pagination: Paginator;
  page: number = 1;
  first = 1
  rows = 4
  pagesArrOptions = []
  totalItems: number = 1;
  currentActivePage = { page: 1 }
  paginationState: paginationState = { ...paginationInitialState }
  isLoaded = false;
  assignmentList: Iassignments[] = [];
  pageNum = 1;
  pageSize = 50;
  searchKey: string = '';

  componentHeaderData: IHeader = {
    'breadCrump': [
      { label: this.translate.instant('sideBar.educationalSettings.children.Subjects Assessments'), routerLink: '/dashboard/educational-settings/assessments/assements-list/', routerLinkActiveOptions: { exact: true } }],

  };

  constructor(
    private headerService: HeaderService,
    private assignmentservice: AssessmentService,
    private translate: TranslateService,) { }

  getAssignmentList(search = '', sortby = '', pageNum = 1, pageSize = 100, sortColumn = '', sortDir = '') {
    this.assignmentservice.getAssignmentList(search, sortby, pageNum, pageSize, sortColumn, sortDir).subscribe(response => {
      this.assignmentList = response?.data;
      this.totalItems = this.assignmentList.length;
      this.isLoaded = true;
    })

  }

  pageChanged(event: any) {
    this.pageNum = event.page;
  }

  ngOnInit(): void {
    this.getAssignmentList();
    this.headerService.Header.next(
      {
        'breadCrump': [
          { label: this.translate.instant('Assignments List'), routerLink: '/dashboard/performance-managment/assignments/assignments-list', routerLinkActiveOptions: { exact: true } }],
      }
    );
  }
  onTableDataChange(event: paginationState) {
    this.first = event.first
    this.rows = event.rows

  }
  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  applyFilter() {
    let searchData = this.searchKey.trim().toLowerCase();
    this.getAssignmentList(searchData, '', 1, 50, '', "asc");
  }

  exportPdf(examPath : any){
    window.open(examPath, '_blank').focus();
   }
   exportAudio(examPath : any){
    window.open(examPath, '_blank').focus();
   }
}
