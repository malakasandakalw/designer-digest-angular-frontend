import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiAuthService } from 'src/services/api/api-auth.service';
import { createMessage } from 'src/app/common/utils/messages';
import { PersonalService } from 'src/services/api/personal.service';

@Component({
  selector: 'app-convert-to-employer-component',
  templateUrl: './convert-to-employer-component.component.html',
  styleUrls: ['./convert-to-employer-component.component.css'],
  standalone: true
})
export class ConvertToEmployerComponent implements OnInit{
  
  async ngOnInit(): Promise<void> {
    try{
      const response = await this.personalService.convertToEmployerProfile()
      if(response) {
        createMessage(this.message, response.status, response.message as string)
        this.apiAuthService.updateUserRole('Employer')
        if(response.status === 'success') {
          setTimeout(() => {
            this.apiAuthService.logout()
          }, 2000)
        }
      }
    } catch(error) {
      console.log(error)
    }
  }
  

  constructor(
    private message: NzMessageService,
    private apiAuthService: ApiAuthService,
    private personalService: PersonalService,
  ) {
    
  }

}
