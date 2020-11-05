HTMLWidgets.widget({
  name: 'tabler',

  type: 'output',

  factory: function (el, width, height) {
    return {
      renderValue: function (x) {
        const {
          sheetId,
          rowsByPage,
          paginate,
          localization: { locale, langs },
        } = x;

        if (!sheetId) {
          return;
        }

        const paginateOptions = paginate && {
          pagination: 'local',
          paginationSize: rowsByPage,
        };

        const localizationOptions = locale && {
          locale,
          langs,
        };

        const reader = new GSheetReader(sheetId);

        reader.getJSON().then(renderTable).catch(handleErr);

        function renderTable(response) {
          const { headers, data } = response;
          const columns = headers.map((header) => ({
            title: header,
            field: header,
            minWidth: 100,
          }));
          const options = Object.assign(
            { columns, data, layout: 'fitColumns' },
            paginateOptions,
            localizationOptions
          );
          const table = new Tabulator(el, options);
        }

        function handleErr(err) {
          el.textContent = err.message;
          console.log(err);
        }
      },

      resize: function (width, height) {
        // TODO: code to re-render the widget with a new size
      },
    };
  },
});
