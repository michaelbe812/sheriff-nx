import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { FeatAdminEditContainerComponent } from './features/admin/feat-admin-edit/feat-admin-edit-container.component';

@Component({
  imports: [NxWelcome, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'client';
  entry = FeatAdminEditContainerComponent;
}
