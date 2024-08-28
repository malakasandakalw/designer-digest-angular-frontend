import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { Designer } from 'src/app/designers/designers.component';
import { Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-single-designer-card',
  standalone: true,
  imports: [CommonModule, NzAvatarModule, NzToolTipModule,NzIconModule],
  templateUrl: './single-designer-card.component.html',
  styleUrls: ['./single-designer-card.component.css']
})
export class SingleDesignerCardComponent {
  @Input({required: true}) designer: Designer | null = null

  constructor(
    private router: Router
  ) {

  }

  navgiateToSingleDesigner(designerId: string) {
    if(!designerId) return
    this.router.navigate([`/designers/${designerId}`])
  }

  navigateToLocationDesigners(locationId: string) {
    if(!locationId) return
    this.router.navigate([`/designers/location/${locationId}`])
  }

}
