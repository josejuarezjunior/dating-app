import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // protected readonly title = signal('client');
  private http = inject(HttpClient); // dependecy injection for HttpClient
  protected title = 'Dating App';
  protected members = signal<any>([]); // signal to hold members data
  
  async ngOnInit() {
    this.members.set(await this.getMembers()); // fetch members data on component initialization  
  }

  async getMembers() {
    try {
      return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
    } catch (error) {
      console.error('Error fetching members:', error);
      throw error; // rethrow the error after logging it
    }
  }

}
