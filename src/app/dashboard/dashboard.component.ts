import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ChartDataset, ChartOptions } from 'chart.js';
import { GenreService } from '../services/genre.service';
import { Genre } from '../models/genre.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  totalBooks: number = 0;
  nbRead: number = 0;
  nbToBeRead: number = 0;
  nbOngoing: number = 0;

  genreCounts: { [genre: string]: number } = {}; // Using genre name as the key
  genresMap: Record<number, string> = {}; // Explicit map for genre IDs to names

  chartDataPie: ChartDataset[] = [
    {
      data: [],
    },
  ];
  chartLabelsPie: string[] = ['Read', 'To Be Read', 'Ongoing'];

  chartDataBar: ChartDataset[] = [
    {
      label: 'Books per Genre',
      data: [],
    },
  ];
  chartLabelsBar: string[] = [];

  chartOptions: ChartOptions = {};

  constructor(private bookService: BookService,private genreService: GenreService) {}

    ngOnInit(): void {
      // Fetch genres and build the map
      this.genreService.getAllGenres().subscribe((genres: Genre[]) => {
        this.genresMap = genres.reduce((map, genre) => {
          map[genre.id] = genre.name;
          return map;
        }, {} as Record<number, string>);
  
        // Fetch books and update data source
        this.loadBooks();
      });
    }

  generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  loadBooks(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.totalBooks = books.length;

      books.forEach((book) => {
        if (book.status === 'read') {
          this.nbRead++;
        } else if (book.status === 'to-be-read') {
          this.nbToBeRead++;
        } else if (book.status === 'ongoing') {
          this.nbOngoing++;
        }
   
        const genreName = this.genresMap[book.genre]; // Now using genre name directly
        if (this.genreCounts[genreName]) {
          this.genreCounts[genreName]++;
        } else {
          this.genreCounts[genreName] = 1;
        }
      });

      // Pie chart data
      this.chartDataPie = [
        {
          data: [this.nbRead, this.nbToBeRead, this.nbOngoing],
        },
      ];

      // Bar chart labels and data
      this.chartLabelsBar = Object.keys(this.genreCounts); // Genre names as labels
      this.chartDataBar = [
        {
          label: 'Books per Genre',
          data: Object.values(this.genreCounts),
          backgroundColor: Object.keys(this.genreCounts).map(() => this.generateRandomColor()), // Random colors for each bar
        },
      ];
    });
  }
}
