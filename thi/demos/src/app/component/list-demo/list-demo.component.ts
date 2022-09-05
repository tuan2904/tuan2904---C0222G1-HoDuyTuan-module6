import {Component, OnInit} from '@angular/core';
import {DemoService} from "../../service/demo.service";
import {Demo} from "../../model/demo";

@Component({
  selector: 'app-list-demo',
  templateUrl: './list-demo.component.html',
  styleUrls: ['./list-demo.component.css']
})
export class ListDemoComponent implements OnInit {

  demo: Demo[] = [];
  totalItems: any;
  totalPages: any;

  constructor(private demoService: DemoService) {
  }

  page = 1;

  ngOnInit(): void {
    this.getAll(this.page-1)
  }

  getAll(page: number) {
    this.demoService.getAll(page).subscribe((demo: any) => {
      if (demo != null) {
        this.demo = demo.content
        this.totalItems = demo.totalItems
        this.totalPages = demo.totalPages
      } else {
        if (page > 0) {
          this.getAll(page - 1)
          this.page = page;
        }
      }
    })
  }
}
