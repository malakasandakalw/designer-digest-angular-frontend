import { Component, OnInit, ViewChild } from '@angular/core';
import * as echarts from 'echarts'
import { NzDatePickerComponent } from 'ng-zorro-antd/date-picker';
import { DesignerService } from 'src/services/api/designer.service';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  loading = false 
  date = null

  startValue: Date | null = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  endValue: Date | null = new Date();
  @ViewChild('endDatePicker') endDatePicker!: NzDatePickerComponent;

  async ngOnInit(): Promise<void> {
    await this.filterDate();
  }

  constructor(
    private designerService: DesignerService
  ) {}

  disabledStartDate = (startValue: Date): boolean => {
    if (!startValue || !this.endValue) {
      return false;
    }
    return startValue.getTime() > this.endValue.getTime();
  };

  disabledEndDate = (endValue: Date): boolean => {
    if (!endValue || !this.startValue) {
      return false;
    }
    return endValue.getTime() <= this.startValue.getTime();
  };

  handleStartOpenChange(open: boolean): void {
    if (!open) {
      this.endDatePicker.open();
    }
    console.log('handleStartOpenChange', open);
  }

  handleEndOpenChange(open: boolean): void {
    console.log('handleEndOpenChange', open);
  }

  following = []
  votes = []
  posts = []

  async filterDate() {
    if(!this.startValue || !this.endValue) return
    this.loading = true
    try {
      const response = await this.designerService.getDashboardData(this.startValue, this.endValue);
      if(response) {

        this.following = response.body.data.followings
        this.votes = response.body.data.votes
        this.posts = response.body.data.posts

        this.createFollowingChart(response.body.data.followings)
        this.creatingVotesChart(response.body.data.votes)
        this.creatingPostsChart(response.body.data.posts)

      }
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }

  }

  createFollowingChart(data: any) {

    const dates = data.map((entry: any) => entry.day);
    const followCounts = data.map((entry: any) => entry.follow_count);

    var chartDom = document.getElementById('follow_count')!;
    var myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          formatter: (value: string) => new Date(value).toLocaleDateString()
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: followCounts,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { name, data } = params[0];
          return `Date: ${new Date(name).toLocaleDateString()}<br>Follows: ${data}`;
        }
      }
    };

    option && myChart.setOption(option);
  }

  creatingVotesChart(data: any) {

    const posts = data.map((entry: any) => entry.post_title);
    const voteCounts = data.map((entry: any) => entry.vote_count);
    
    var chartDom = document.getElementById('votes_count')!;
    var myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: posts,
        axisLabel: {
          formatter: (value: string) => value.toString().slice(0, 20) + '...'
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: voteCounts,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { name, data } = params[0];
          return `${name}<br/>Votes: ${data}`;
        }
      }
    };

    option && myChart.setOption(option);
  }

  creatingPostsChart(data: any) {

    const dates = data.map((entry: any) => entry.day);
    const postsCreated = data.map((entry: any) => entry.post_count);

    var chartDom = document.getElementById('posts_count')!;
    var myChart = echarts.init(chartDom);

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: dates,
        axisLabel: {
          formatter: (value: string) => new Date(value).toLocaleDateString()
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: postsCreated,
          type: 'bar',
          label: {
            show: true,
            position: 'top'
          }
        }
      ],
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const { name, data } = params[0];
          return `Date: ${new Date(name).toLocaleDateString()}<br>Posts: ${data}`;
        }
      }
    };

    option && myChart.setOption(option);
  }


}
