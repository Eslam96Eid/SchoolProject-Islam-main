import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import {IHeader } from 'src/app/core/Models/iheader';
import { HeaderService } from 'src/app/core/services/header-service/header.service';
import { Ichiledren } from '../../models/Ichiledren';
import { Istudent } from '../../models/Istudent';
import { ParentService } from '../../services/parent.service';

@Component({
  selector: 'app-children-list',
  templateUrl: './children-list.component.html',
  styleUrls: ['./children-list.component.scss']
})
export class ChildrenListComponent implements OnInit {

  faChevronLeft = faChevronLeft

  items: MenuItem[] = [
    { label: 'اولياء الامور' },
    { label: 'قائمه الابناء' },
  ];

  componentHeaderData: IHeader = {
    breadCrump: [
      { label: this.translate.instant('dashboard.parents.parents'),routerLink:'/dashboard/schools-and-students/all-parents/',routerLinkActiveOptions:{exact: true} },
      { label: this.translate.instant('dashboard.parents.childrenList') }
    ],
    mainTitle: { main: this.translate.instant('dashboard.parents.childrenList'), sub: '(محمد على طارق)' }
  }

  // students = [
  //   {
  //     name: 'محمد على',
  //     age: 15,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد علي محمد ',
  //     age: 12,
  //     regestered: false,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'

  //   },
  //   {
  //     name: 'محمد على',
  //     age: 13,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد علي محمد ',
  //     age: 12,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد علي محمد ',
  //     age: 12,
  //     regestered: true,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   },
  //   {
  //     name: 'محمد علي محمد ',
  //     age: 12,
  //     regestered: false,
  //     regesteredSchool: 'مدرسه الشارقه الابتدائيه',
  //     school: 'مدرسه الشارقه',
  //     class: 'الصف الرابع',
  //     relativeRelation: 'ابن الاخ',
  //     src: 'assets/images/avatar.png'
  //   }
  // ]
  constructor(
    private translate: TranslateService,
    private headerService: HeaderService,
    private parentService : ParentService,
    private _router: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getChildernByParentId();
    this.headerService.changeHeaderdata(this.componentHeaderData)

  }

  chiledren: Ichiledren[] ;
  students: Istudent[] ;
  getChildernByParentId(){
    this.parentService.getChildernByParentId(Number(this._router.snapshot.paramMap.get('id'))).subscribe(response => {
      this.chiledren = response.children;
      this.students = response.students;
      console.log(this.chiledren);
      console.log(this.students);
            // this.userFormGrp.patchValue({
      //   fullName: this.account.fullName,
      //   phoneNumber: this.account.phoneNumber,
      //   email: this.account.email,
      //   password :  this.account.password,
      //   nickName : this.account.nickName,
      //   identityNumber : this.account.nationalityId,
      //   privateRole : this.account.roles,
      //   userStatus : this.account.isActive
      // })
    })
  }
}
