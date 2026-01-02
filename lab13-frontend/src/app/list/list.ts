import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../person';
import { Person } from '../person.model';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html'
})
export class ListComponent implements OnInit {
  people: Person[] = [];

  constructor(
    private personService: PersonService, 
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.refresh();
  }

  refresh() {
    this.personService.getAll().subscribe({
      next: (data) => {
        console.log('Dane z serwera:', data); 
        this.people = data;
        this.cdr.detectChanges(); 
      },
      error: (err) => {
        console.error('Błąd pobierania listy:', err); 
      }
    });
  }

  remove(person: Person) {
    if (!person.id) return;
    this.personService.delete(person.id).subscribe(() => {
      this.refresh();
    });
  }
}