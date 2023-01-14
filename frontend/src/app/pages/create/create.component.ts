import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  userForm!:FormGroup;

  selectedFile!: File;
constructor(private fb:FormBuilder, private userService:UserService){
this.userForm=this.fb.nonNullable.group({
 username:[''],
 password:[''],
 displayName:['']

})
}

onFileChanged(event:any) {
  this.selectedFile = event.target.files[0];
}

onSubmit() {
  const formData = new FormData();
  formData.append('avatar', this.selectedFile, this.selectedFile.name);
  formData.append('username', this.userForm.get('username')!.value);
  formData.append('password', this.userForm.get('password')!.value);

  formData.append('displayName', this.userForm.get('displayName')!.value);

  this.userService.createUser(formData)
   
}
}
