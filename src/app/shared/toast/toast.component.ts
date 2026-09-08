import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Check, CircleX, LucideAngularModule } from 'lucide-angular';

import { ToastService } from './toast.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.component.html',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(12px)',
        }),
        animate(
          '250ms ease-out',
          style({
            opacity: 1,
            transform: 'translateY(0)',
          }),
        ),
      ]),

      transition(':leave', [
        animate(
          '200ms ease-in',
          style({
            opacity: 0,
            transform: 'translateY(12px)',
          }),
        ),
      ]),
    ]),
  ],
})
export class ToastComponent {
  readonly Check = Check;
  readonly CircleX = CircleX;

  toast$ = this.toastService.toast$;

  constructor(private toastService: ToastService) {}
}
