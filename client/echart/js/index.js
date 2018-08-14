var _main = {
  data: {
    label: [],
    legend: [],
    list: {}
  },
  initChart (opt) {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    var series = [];
    for (var k in opt.list) {
      series.push({
          name: k,
          type:'line',
          stack: '总量',
          data: opt.list[k]
      })
    }

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '比特币&美元走势'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: this.data.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: this.data.label
        },
        yAxis: {
            type: 'value'
        },
        series
    };
    console.log(option)
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
  },
  init () {
    _utils.get('http://api.kii.io/', {} , data => {
      console.log(data);
      if (!data.length) return
      data.forEach((e, i) => {
        for (var key in e) {
          if ( key === 'time' ) {
            this.data.label.push(e.time);
          } else {
            for (var sub in e[key]) {
              if ( i === 0 ) {
                this.data.legend.push(key + '-' + sub);
              }
              if (!this.data.list[key + '-' + sub]) {
                this.data.list[key + '-' + sub] = []
              }
              this.data.list[key + '-' + sub].push(e[key][sub]);
            }
          }
        }
      })
      console.log(this.data)
      this.initChart(this.data);
    })

  }
}

_main.init();
