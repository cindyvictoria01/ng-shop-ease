import { Component } from '@angular/core';
import { LoaderCircle, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './loading-spinner.component.html',
})
export class LoadingSpinnerComponent {
  readonly LoaderCircle = LoaderCircle;
}
