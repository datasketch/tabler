HTMLWidgets.widget({
  name: 'tabler',

  type: 'output',

  factory: function (el, width, height) {
    return {
      renderValue: function (x) {
        const { sheetId, rowsByPage, paginate } = x;
        if (!sheetId) {
          return;
        }
        const paginateOptions = paginate
          ? { pagination: 'local', paginationSize: rowsByPage }
          : {};

        const reader = new GSheetReader(sheetId);

        reader
          .getJSON()
          .then(function (response) {
            const columns = response.headers.map(function (header) {
              return { title: header, field: header };
            });
            const tabulator = new Tabulator(el, {
              columns,
              data: response.data,
              layout: 'fitColumns',
              ...paginateOptions,
            });
          })
          .catch(function (err) {
            console.log(err);
          });
      },

      resize: function (width, height) {
        // TODO: code to re-render the widget with a new size
      },
    };
  },
});
