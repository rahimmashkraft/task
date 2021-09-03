import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  isCheckClick: any;
  add_number_array: any = [];
  total_points:number = 0;
  interval;

  startDuration: any = 5;
  time: BehaviorSubject<string> = new BehaviorSubject('00:00');
  percent: BehaviorSubject<number> = new BehaviorSubject(100)
  timer: number;
  constructor(
    public toastController: ToastController
  ) { 
    this.startTimer(2);
  }
  
  addNumber(value) {
    this.presentToast(value)
    let audio = new Audio();
    audio.src = "../assets/beep.wav";
    audio.play();
    this.isCheckClick = value;
    this.add_number_array.push(value)
    this.total_points = this.add_number_array.map(a => a).reduce(function (a, b) {
      return a + b;
    });
  }
  async presentToast(value) {
    const toast = await this.toastController.create({
      message: value+' Points add in your account.',
      duration: 1000
    });
    toast.present();
  }

  startTimer(duration: number) {
    clearInterval(this.interval);
    this.timer = duration * 60;
    this.interval = setInterval(() => {
      this.updateTimeValue()
    }, 1000)
  }
  stopTimer() {
    clearInterval(this.interval);
    this.time.next('00:00');
    this.isCheckClick = 0;
    this.add_number_array = [];
    this.total_points = 0;
  }
  updateTimeValue() {
    let minutes: any = this.timer / 60;
    let seconds: any = this.timer % 60;
    minutes = String('0' + Math.floor(minutes)).slice(-2);
    seconds = String('0' + Math.floor(seconds)).slice(-2);
    const text = minutes + ':' + seconds;
    this.time.next(text);
    const totalTime = this.startDuration * 5;
    const percentage = ((totalTime - this.timer) / totalTime) * 100;
    this.percent.next(percentage);
    --this.timer;
    if (this.timer < 0) {
      this.stopTimer()
    }
  }
}
