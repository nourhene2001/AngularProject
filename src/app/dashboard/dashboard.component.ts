import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone:false,
})
export class DashboardComponent implements OnInit {
  totalBooks: number = 0;
  nbRead: number = 0;
  nbToBeRead: number = 0;
  nbOngoing: number = 0;

  genreCounts: { [genre: string]: number } = {};

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

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
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

        const genre = book.genre;
        if (this.genreCounts[genre]) {
          this.genreCounts[genre]++;
        } else {
          this.genreCounts[genre] = 1;
        }
      });

      this.chartDataPie = [
        {
          data: [this.nbRead, this.nbToBeRead, this.nbOngoing],
        },
      ];
      this.chartLabelsBar = Object.keys(this.genreCounts);
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
