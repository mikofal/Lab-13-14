import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; 
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { PersonService } from '../person';
import { Person } from '../person.model';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.html'
})
export class DetailsComponent implements OnInit {
  person: Person | undefined;

  constructor(
    private route: ActivatedRoute,
    private personService: PersonService,
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (id) {
      this.personService.getPerson(id).subscribe({
        next: (data) => {
          console.log('Pobrano szczegóły:', data);
          this.person = data;
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Błąd:', err)
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}