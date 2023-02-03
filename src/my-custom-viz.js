import Highcharts from 'highcharts'
import css from './main.css'

looker.plugins.visualizations.add({
  options: {
    title: {
      type: 'string', // string, number, boolean, array
      label: 'Title',
      // default: '',
      display: 'text', // type = string: (text, select, radio);  type = number: (number, range), type = array: (text, color, colors)
      placeholder: 'Title',
      // values: [{ }]
      // min: 0
      // max: 0
      // step: 0
      section: 'Settings',
      order: 1,
      display_size: 'normal', // normal, half, third
    },
    numCategories: {
      type: 'number',
      label: '# of Categories',
      display: 'number',
      default: 10,
      min: 0,
      step: 1,
      section: 'Categories',
      order: 2,
      display_size: 'normal',
    },
  },

  create: function (element, config) {
    css.use()
    element.innerHTML = `
      <h1 id="title" class="title"></h1>
      <div id="viz-container"></div>
    `
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors()

    const { dimension_like, measure_like, table_calculations } = queryResponse.fields

    if (dimension_like.length != 1 || measure_like.length != 1 || table_calculations.length !== 1) {
      this.addError({
        title: 'Invalid query response.',
        message: 'One dimension, one measure, and one table calculation are required.',
      })
    }

    if (config.title) {
      document.getElementById('title').innerHTML = config.title
    }

    const seriesData = data.slice(0, config.numCategories ?? 10)
    const categoryFieldName = dimension_like[0].name
    const randomFieldName = table_calculations[0].name
    const incidentFieldName = measure_like[0].name
    const categories = seriesData.map((d) => d[categoryFieldName].value)
    const randomValues = seriesData.map((d) => d[randomFieldName].value)
    const incidents = seriesData.map((d) => d[incidentFieldName].value)
    const chart = Highcharts.chart('viz-container', {
      title: '',
      chart: {
        type: 'bar',
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Incidents',
        },
      },
      series: [
        {
          name: 'Random',
          data: randomValues,
        },
        {
          name: 'Incidents',
          data: incidents,
        },
      ],
    })

    done()
  },
})
