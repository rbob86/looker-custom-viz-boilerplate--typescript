project_name: "my-custom-viz-project"

constant: VIS_LABEL {
  value: "My Custom Viz"
  export: override_optional
}

constant: VIS_ID {
  value: "my-custom-viz"
  export:  override_optional
}

visualization: {
  id: "@{VIS_ID}"
  file: "my-custom-viz.js"
  label: "@{VIS_LABEL}"
}
