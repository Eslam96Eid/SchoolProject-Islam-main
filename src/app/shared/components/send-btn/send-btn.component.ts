import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from 'src/app/core/services/user.service';
import { IAccountAddOrEdit } from 'src/app/modules/dashboard/modules/user-information/models/IAccountAddOrEdit';

@Component({
  selector: 'app-send-btn',
  templateUrl: './send-btn.component.html',
  styleUrls: ['./send-btn.component.scss']
})
export class SendBtnComponent implements OnInit {
  @Input('route') routeUrl='';
  @Input('content') content:FormGroup;
  @Input('backGroundColor') backGroundColor='';
  plusIcon = faPlus;
  checkIcon = faCheck;

  accountModel : IAccountAddOrEdit= <IAccountAddOrEdit>{};;




  constructor(private _router: ActivatedRoute,private router: Router,private route:ActivatedRoute , private userService : UserService) { }

  ngOnInit(): void {
   
  }
  goToAddNew()
  {
    let id = this._router.snapshot.paramMap.get('userId');
    if(id == null){
      debugger
      this.accountModel.id =Number(id);
      this.accountModel.fullName = this.content.value.fullName;
      this.accountModel.phoneNumber = this.content.value.phoneNumber;
      this.accountModel.email = this.content.value.email;
      this.accountModel.emiratesIdNumber = "7894562";
      this.accountModel.arabicSurname = "";
      this.accountModel.englishSurname = "";
      this.accountModel.jobTitle = "test";
      this.accountModel.gender = 0;
      this.accountModel.birthDate = "",
      this.accountModel.emiratesIdPath = "";
      this.accountModel.employeeIdNumber = "";
      this.accountModel.permissionToEnterScore = true;
      this.accountModel.relativeRelationId= 0;
      this.accountModel.scope= "SPEA";
      this.accountModel.isActive= true;
      this.accountModel.nickName = this.content.value.nickName;
      this.accountModel.nationalityId =null;
      this.accountModel.password = this.content.value.password;
      this.accountModel.status = 1;
      this.accountModel.roles = [2];
      console.log( this.accountModel);
      this.userService.AddAccount(this.accountModel).subscribe(res => {
      console.log(res);
     });
    }
    else{
      debugger
       this.accountModel.id =Number(id);
       this.accountModel.fullName = this.content.value.fullName;
       this.accountModel.phoneNumber = this.content.value.phoneNumber;
       this.accountModel.email = this.content.value.email;
       this.accountModel.emiratesIdNumber = "7894562";
       this.accountModel.arabicSurname = "";
       this.accountModel.englishSurname = "";
       this.accountModel.jobTitle = null;
       this.accountModel.gender = null;
       this.accountModel.birthDate = "",
       this.accountModel.emiratesIdPath = "";
       this.accountModel.employeeIdNumber = "";
       this.accountModel.permissionToEnterScore = true;
       this.accountModel.relativeRelationId= null;
       this.accountModel.scope= "SPEA";
       this.accountModel.isActive= false;
       this.accountModel.nickName = this.content.value.nickName;
       this.accountModel.nationalityId =null;
       this.accountModel.password = this.content.value.password;
       this.accountModel.status = 1;
       this.accountModel.roles = [2];
       this.userService.EditAccount(this.accountModel).subscribe(res => {
       console.log(res);
      });
    }
    this.router.navigate([this.routeUrl],{relativeTo:this.route});
  }
}
