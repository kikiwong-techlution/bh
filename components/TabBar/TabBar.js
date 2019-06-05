Component({
  properties: {
    color: {
      type: String,
      value: '#000'
    },
    selectedColor: {
      type: String,
      value: '#000'
    },
    backgroundColor: {
      type: String,
      value: '#fff'
    },
    borderStyle: {
      type: String,
      value: '#000'
    },
    list: {
      type: Array,
      value: []
    },
    position: {
      type: String,
      value: 'bottom'
    }
  }
})