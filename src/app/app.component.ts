import { Component, NgZone, ChangeDetectorRef } from '@angular/core';

function padTime(time: number): string {
  return time.toString().padStart(2, '0');
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  intervalId = null;
  title = 'Let the countdown begin!!';
  timeLeft = 15;
  isRunning = false;
  minutes = padTime(Math.floor(this.timeLeft / 60));
  seconds = padTime(this.timeLeft - (Number(this.minutes) * 60));

  constructor(private cdr: ChangeDetectorRef) { }

  startTimer(): void {
    if (this.intervalId !== null) return;

    this.title = `You're doung great!`;
    this.isRunning = true;

    this.intervalId = setInterval(() => {
      if(this.timeLeft >= 1) {
        this.timeLeft = this.timeLeft - 1;
        this.calcTime();
        return;
      };
      this.timeLeft = 0;
      this.calcTime();
     }, 1000);

  }

  stopTimer(): void {
    if (this.intervalId === null) return;
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.isRunning = false;
  }

  resetTimer(): void {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.title = 'Ready to go another round?';
    this.timeLeft = 25*60;
    this.isRunning = false;
    this.calcTime();
  }

  private calcTime(): void {
    this.minutes = padTime(Math.floor(this.timeLeft / 60));
    this.seconds = padTime(this.timeLeft - (Number(this.minutes) * 60));
    this.cdr.detectChanges();
  }
  
}
