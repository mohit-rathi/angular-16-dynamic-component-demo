import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('alertContainer', { read: ViewContainerRef, static: true })
  alert!: ViewContainerRef;

  message = new FormControl<string>('', { nonNullable: true, validators: [Validators.required] });
  type: string = 'primary';
  isAlertVisible: boolean = false;

  // NgIf
  // showAlert(type: string) {
  //   this.type = type;
  //   this.isAlertVisible = true;
  // }

  // Dynamic Component
  showAlert(type: string) {
    this.alert.clear();
    const componentRef = this.alert.createComponent(AlertComponent);
    // componentRef.instance.message = this.message.value;
    // componentRef.instance.type = type;
    componentRef.setInput('message', this.message.value);
    componentRef.setInput('type', type);

    componentRef.instance.close.subscribe(() => {
      componentRef.destroy();
    });
  }

  // NgIf
  // hideAlert() {
  //   this.isAlertVisible = false;
  // }

  // Dynamic Component
  hideAlert() {
    
  }
}
