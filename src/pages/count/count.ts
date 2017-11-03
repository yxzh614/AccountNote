import { BillProvider } from './../../providers/bill/bill';
import { MonthCount } from "./../../models/MonthCount";
import { Component, Directive, ViewChild, ElementRef } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
declare var echarts;

@IonicPage()
@Component({
  selector: "page-count",
  templateUrl: "count.html"
})
export class CountPage {
  @ViewChild("container") container: ElementRef;
  chart: any;
  option: any;
  monthCount: MonthCount[];
  monthTotalCost: Number;
  isLastMonth: Boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public billProvider:BillProvider) {
    this.monthTotalCost = 0;
  }
  ionViewDidEnter() {
    this.isLastMonth = true;
    let ctx = this.container.nativeElement;
    console.log(ctx);
    this.chart = echarts.init(ctx);
    this.getFirstBill();
    this.billProvider.test();
  }
  getFirstBill() {
    this.getChartOption();
    this.chart.setOption(this.option);
    this.getMonthTotalCost();
    this.getMonthCount();
  }
  getMonthTotalCost() {
    this.monthTotalCost = -4534;
  }
  getChartOption() {
    this.option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["餐饮", "交通", "学习", "零食", "娱乐"]
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
          data: [
            { value: 335, name: "餐饮" },
            { value: 310, name: "交通" },
            { value: 234, name: "学习" },
            { value: 135, name: "零食" },
            { value: 1548, name: "娱乐" }
          ]
        }
      ]
    };
  }
  getMonthCount() {
    this.monthCount = [
      {
        type: "餐饮",
        value: -200
      },
      {
        type: "餐饮",
        value: -200
      }
    ];
  }
  lastMonthBill(infiniteScroll) {
    this.isLastMonth = !this.isLastMonth;
      this.getChartOption();
      this.chart.setOption(this.option);
      this.getMonthTotalCost();
      this.getMonthCount();
  }
  nextMonthBill(refresher) {
    this.isLastMonth = !this.isLastMonth;
      this.getChartOption();
      this.chart.setOption(this.option);
      this.getMonthTotalCost();
      this.getMonthCount();
  }
}
