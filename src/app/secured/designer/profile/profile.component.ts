import { Component, OnInit } from '@angular/core';
import { DesignerService } from 'src/services/api/designer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  async ngOnInit() {
    await this.designerService.test()
  }

  constructor(
    private readonly designerService:DesignerService
  ) {
  }


}
