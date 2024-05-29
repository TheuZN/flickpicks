import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  headerModalVisible = false;
  btnOpen = true;
  btnClose = false;

  formSearch: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router){
    this.formSearch = this.formBuilder.group({
      query: ['', [Validators.required]],
    });
  }

  onClickMobileOpen() {
    this.headerModalVisible = true;
    this.btnOpen = false;
    this.btnClose = true;  
  }

  onClickMobileClose() {
    this.headerModalVisible = false;
    this.btnOpen = true;
    this.btnClose = false;
  }

  onSearch() {
    if(this.formSearch.valid) {
      const queryValue = this.formSearch.get('query')!.value;
      this.router.navigate(['search', queryValue]);
    } else {
      const queryValue = this.formSearch.get('query')!.value;
      this.router.navigate(['search', queryValue]);
    }
  }
}
