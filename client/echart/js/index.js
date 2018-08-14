var _main = {
  data: {
    label: [],
    legend: [],
    list: {}
  },
  initChart (opt) {
    // 基于准备好的dom，初始化echarts实例
    var usdChart = echarts.init(document.getElementById('usd'));
    var btcChart = echarts.init(document.getElementById('btc'));

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
    var usdOption = {
        title: {
            text: '美元'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: this.data.legend.filter( e => { return /usd/.test(e) })
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
        series: series.filter(e => {
          return /usd/.test(e.name)
        })
    };

    var btcOption = {
        title: {
            text: '比特币'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: this.data.legend.filter( e => { return /btc/.test(e) })
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
        series: series.filter(e => {
          return /btc/.test(e.name)
        })
    };

    // 使用刚指定的配置项和数据显示图表。
    usdChart.setOption(usdOption);
    btcChart.setOption(btcOption);
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
