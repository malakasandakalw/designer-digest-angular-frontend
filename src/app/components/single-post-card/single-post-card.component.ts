import { Component, Input } from '@angular/core';
import { Post } from 'src/app/common/interfaces/CommonInterface';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';

@Component({
  selector: 'app-single-post-card',
  templateUrl: './single-post-card.component.html',
  styleUrls: ['./single-post-card.component.css'],
  standalone: true,
  imports: [NzCardModule, NzGridModule]
})
export class SinglePostCardComponent {
  @Input() post: Post | null = null
}
