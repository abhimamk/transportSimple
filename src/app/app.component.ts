import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
interface lines {
  straight: boolean;
  startObj: object;
  endObj: object;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tps';
  tpsForm: FormGroup;
  arr = [];
  straightOrg: lines;
  straightBLue: lines;
  tripLoop: lines;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.tpsForm = this.formBuilder.group({
      start: ['', Validators.compose([Validators.required])],
      end: ['', Validators.compose([Validators.required])],
    });
  }

  onAdd(): void {
    if (this.tpsForm.invalid) {
      console.log('invalid');
    }
    this.arr.push(this.tpsForm.value);
    if (this.arr.length === 1) {
      // this.tpsForm.reset();
    }
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = i + 1; j < this.arr.length; j++) {
        if (this.arr[i].end === this.arr[j].start) {
          this.straightOrg = {
            straight: true,
            startObj: this.arr[i],
            endObj: this.arr[j],
          };
          this.tpsForm.reset();
          break;
        } else if (this.arr[i].start === this.arr[j].end) {
          this.straightBLue = {
            straight: true,
            startObj: this.arr[i],
            endObj: this.arr[j],
          };
          this.tpsForm.reset();
          break;
        } else if (
          this.arr[i].start === this.arr[j].start &&
          this.arr[i].end === this.arr[j].end
        ) {
          this.tripLoop = {
            straight: true,
            startObj: this.arr[i],
            endObj: this.arr[j],
          };
          this.tpsForm.reset();
          break;
        }
      }
    }
  }

  onSlice(value): void {
    return value.slice(0, 3).toUpperCase();
  }
}
