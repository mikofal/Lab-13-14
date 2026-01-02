import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonService } from '../person';
import { Person } from '../person.model';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-add-person',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatCardModule],
  templateUrl: './add-person.html'
})
export class AddPersonComponent {
  person: Person = { 
    address: {} 
  };

  constructor(private personService: PersonService, private router: Router) {}

  save() {
    this.personService.add(this.person).subscribe(() => {
        console.log('Osoba zapisana w bazie!');
        this.router.navigate(['/']); 
    });
  }
}