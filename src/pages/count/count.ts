import { BillProvider } from './../../providers/bill/bill';
import { MonthCount } from "./../../models/MonthCount";
import { Component, Directive, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { Http } from "@angular/http";
declare var echarts;

@IonicPage()
@Component({
  selector: "page-count",
  templateUrl: "count.html"
})
export class CountPage {
  @ViewChild("container") container: ElementRef;
  ldata: any;
  ldata2: any;
  title: string;
  chart: any;
  option: any;
  monthCount: MonthCount[];
  monthTotalCost: Number;
  monthYusuan: number;
  month: number = (new Date()).getMonth();
  monthChange: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public billProvider:BillProvider, public http: Http) {
    this.monthTotalCost = 0;
  }
  ionViewDidEnter() {
    this.monthChange = 0;
    let ctx = this.container.nativeElement;
    console.log(ctx);
    this.chart = echarts.init(ctx);
    this.getFirstBill();
  }
  getFirstBill() {
    this.http.post('http://localhost/accountNoteBackEnd/count', {
      monthChange: this.monthChange,
      username: window.localStorage.username,
      year: (new Date()).getFullYear(),
      month: (new Date()).getMonth() + 1,
      day: (new Date()).getDate()
    })
    .map(res => res.json())
    .subscribe(res => {
      this.monthYusuan = res.yusuan;
      this.title = `${res.year}年${res.month}月`;
      this.monthTotalCost = res.totalout;
      this.monthCount = res.zhanbi;
      this.ldata = res.zhanbi.map(item => item.type);
      this.ldata2 = res.zhanbi.map (function (item) {
        return {
          name: item.type,
          value: item.value
        }
      })
      this.option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "left",
          data: this.ldata
        },
        series: [
          {
            name: "支出情况",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.ldata2
          }
        ]
      };
      console.log(this.option); 
    this.chart.setOption(this.option);
    })
  }
  lastMonthBill(infiniteScroll) {
    this.monthChange--;
    this.getFirstBill();
  }
  nextMonthBill(refresher) {
    this.monthChange++;
    this.getFirstBill();
  }
}
