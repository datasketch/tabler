HTMLWidgets.widget({
  name: 'tabler',

  type: 'output',

  factory: function (el, width, height) {
    const _tableContainer = 'ds-tabler-table';

    const _createTablerContainer = function _createTablerContainer() {
      const container = document.createElement('div');
      container.id = _tableContainer;
      return container;
    };

    const _createSearchInput = function _createSearchInput(config) {
      const { table, fields, placeholder } = config;

      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', placeholder);
      input.classList.add('ds-tabler-search');

      input.addEventListener('change', (event) => {
        const value = event.target.value.trim();
        const filters = fields.map((field) => ({
          field,
          value,
          type: 'like',
        }));
        table.setFilter([filters]);
      });

      input.addEventListener('input', (event) => {
        const value = event.target.value.trim();
        if (value) {
          return;
        }
        table.clearFilter();
      });

      return input;
    };

    return {
      renderValue: function (x) {
        const {
          sheetId,
          rowsByPage,
          paginate,
          localization: { locale, langs },
          search,
        } = x;

        if (!sheetId) {
          return;
        }

        const container = _createTablerContainer();
        el.appendChild(container);

        const paginateOptions = paginate && {
          pagination: 'local',
          paginationSize: rowsByPage,
        };

        const localizationOptions = locale && {
          locale,
          langs,
        };

        const reader = new GSheetReader();

        reader.getJSON(sheetId).then(renderTable).catch(handleErr);

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
          const table = new Tabulator(container, options);

          if (!search.enable) {
            return;
          }

          let userDefinedFields = search.fields;

          if (!Array.isArray(userDefinedFields)) {
            userDefinedFields = [userDefinedFields];
          }

          const fields = userDefinedFields[0] ? userDefinedFields : headers;

          const input = _createSearchInput({
            table,
            fields,
            placeholder: search.placeholder,
          });
          el.insertBefore(input, container);
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
