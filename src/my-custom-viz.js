import Highcharts from 'highcharts'
import css from './main.css'

looker.plugins.visualizations.add({
  options: {
    title: {
      type: 'string', // string, number, boolean, array
      label: 'Title',
      // default: '',
      display: 'text', // type = string: (text, select, radio) || type = number: (number, range) || type = array: (text, color, colors)
      placeholder: 'Title',
      // values: [{ }]
      // min: 0
      // max: 0
      // step: 0
      section: 'Settings',
      order: 1,
      display_size: 'normal', // normal, half, third
    },
    titleColor: {
      type: 'array',
      label: 'Title Color',
      default: '#000000',
      display: 'color',
      section: 'Settings',
      order: 2,
      display_size: 'half',
    },
    numCategories: {
      type: 'number',
      label: '# of Categories',
      display: 'number',
      default: 10,
      min: 0,
      step: 1,
      section: 'Categories',
      order: 1,
    },
  },

  create: function (element, config) {
    css.use()

    element.innerHTML = `
      <div class="top-bar">
        <button id="drill-field-example"></button>
        <h1 id="title" class="title"></h1>
        <button id="register-option">Register New Option</button>
      </div>
      <div id="viz-container"></div>
    `

    // Register new option on click
    document.getElementById('register-option').onclick = () => {
      this.trigger('registerOptions', {
        ...this.options,
        hideTitle: {
          type: 'boolean',
          label: 'Hide Title',
          display: 'radio',
          default: false,
          section: 'Settings',
          order: 3,
        },
      })
    }
  },

  /**
   * @param data An array of rows representing the current data in the query. May be null.
   * @param element A DOM Element representing a container to render your visualization into.
   * @param config An object representing the values of any configuration options that the user has set for this chart.
   * @param queryResponse An object representing metadata about the current query, such as metadata about fields. May be null.
   * @param details Details about the current rendering context. Contains information about why the chart is rendering and what has changed. (changed, crossFilterEnabled, crossFilters, print)
   * @param done A callback to indicate that the visualization is fully rendered. This is especially important to call if your visualization needs to perform asynchronous calls or needs to be rendered as a PDF.
   * @returns
   */
  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors()

    const { dimensions, measures, table_calculations } = queryResponse.fields

    // Return error if invalid query response
    if (dimensions.length !== 1 || measures.length !== 1 || table_calculations.length !== 1) {
      this.addError({
        title: 'Invalid query response.',
        message: 'One dimension, one measure, and one table calculation are required.',
      })
      return
    }

    // Update title based on config settings
    const title = document.getElementById('title')
    title.innerHTML = !config.hideTitle && config.title ? config.title : ''
    title.style.color = config.titleColor ?? '#000000'

    // Transform data
    const seriesData = data.slice(0, config.numCategories ?? 10)
    const categoryFieldName = dimensions[0].name
    const randomFieldName = table_calculations[0].name
    const incidentFieldName = measures[0].name
    const categories = seriesData.map((d) => LookerCharts.Utils.textForCell(d[categoryFieldName]))
    const randomValues = seriesData.map((d) => d[randomFieldName].value)
    const incidents = seriesData.map((d) => d[incidentFieldName].value)

    document.getElementById('drill-field-example').innerHTML = LookerCharts.Utils.htmlForCell(
      data[0][incidentFieldName]
    )

    // Build chart
    const chart = Highcharts.chart('viz-container', {
      title: '',
      chart: {
        type: 'bar',
        animation: false,
      },
      xAxis: {
        categories,
      },
      yAxis: {
        title: {
          text: 'Values',
        },
      },
      plotOptions: {
        series: {
          animation: false,
          events: {
            click: (e) => {
              const { index } = e.point

              LookerCharts.Utils.openDrillMenu({
                links: data[index][incidentFieldName].links,
                event: e,
              })
            },
          },
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

    // Add cross filter functionality to x-axis labels
    chart.xAxis[0].labelGroup.element.childNodes.forEach((label) => {
      label.style.cursor = 'pointer'
      label.onclick = function (e) {
        const selectedCategory = this.textContent
        const category = data.filter((d) => d[categoryFieldName].value === selectedCategory)[0][categoryFieldName]
        // if (details.crossfilterEnabled) {
        LookerCharts.Utils.toggleCrossfilter({
          row: {
            [categoryFieldName]: category,
          },
          event: e,
        })
        // }
      }
    })

    done()
  },
})
