HTMLWidgets.widget({

  name: 'tabler',

  type: 'output',

  factory: function(el, width, height) {
    return {
      renderValue: function(x) {
        const sheetId = x.sheetId;
        if (!sheetId) {
          return;
        }
        const reader = new GSheetReader(sheetId);
        reader.getJSON()
          .then(function (response) {
            const columns = response.headers.map(function (header) {
              return { title: header, field: header };
            });
            const tabulator = new Tabulator(el, {
              columns,
              data: response.data,
              layout: 'fitColumns'
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      resize: function(width, height) {
        // TODO: code to re-render the widget with a new size
      }

    };
  }
});
