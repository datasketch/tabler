'use strict';

HTMLWidgets.widget({
  name: 'tabler',

  type: 'output',

  factory: function (el, width, height) {
    const _tableContainer = 'ds-tabler__table';

    const _createTablerContainer = function _createTablerContainer() {
      const container = document.createElement('div');
      container.id = _tableContainer;
      return container;
    };

    const _getSearchFields = function _getSearchFields(config) {
      const { userDefinedFields, headers } = config;
      const fields =
        !userDefinedFields || !userDefinedFields.length
          ? headers
          : userDefinedFields;
      return fields;
    };

    const _createSearchInput = function _createSearchInput(placeholder) {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('placeholder', placeholder || '');
      input.classList.add('ds-tabler__search');

      return input;
    };

    const _createDropdownFilters = function _createDropdownFilters(filters) {
      const dropdownFilters = document.createElement('div');
      dropdownFilters.classList.add('ds-tabler__dropdowns');

      for (const filter of filters) {
        const filterBox = document.createElement('div');
        const label = document.createElement('label');
        const select = document.createElement('select');

        filterBox.classList.add('ds-tabler__dropdown');

        label.setAttribute('for', filter.slug);
        label.textContent = filter.label;

        select.appendChild(document.createElement('option'));
        select.setAttribute('name', filter.field);
        select.id = filter.slug;

        for (let value of filter.values) {
          const option = document.createElement('option');
          option.textContent = value;
          select.appendChild(option);
        }

        filterBox.appendChild(label);
        filterBox.appendChild(select);
        dropdownFilters.appendChild(filterBox);
      }

      return dropdownFilters;
    };

    return {
      renderValue: function (x) {
        const {
          sheetId,
          rowsByPage,
          paginate,
          localization: { locale, langs },
          search,
          filters,
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

          if (!search.enable && (!filters || !filters.length)) {
            return;
          }

          const filterSlot = document.createElement('div');
          filterSlot.classList.add('ds-tabler__filters');
          el.insertBefore(filterSlot, container);

          let searchInput, searchFields;
          let fieldsFilter = [];

          if (search.enable) {
            searchFields = _getSearchFields({
              userDefinedFields: search.fields,
              headers,
            });
            searchInput = _createSearchInput(search.placeholder);
            filterSlot.appendChild(searchInput);
          }

          if (filters.length) {
            const _filters = filters.reduce((f, filter) => {
              const values = data.map((record) => record[filter.field]);
              const slug = filter.field.toLowerCase().replace(/\s+/, '_');
              return [
                ...f,
                {
                  slug,
                  field: filter.field,
                  label: filter.label,
                  values: Array.from(new Set(values)).sort(),
                },
              ];
            }, []);

            const dropdownFilters = _createDropdownFilters(_filters);
            const dropdowns = dropdownFilters.querySelectorAll('select');

            dropdowns.forEach((select) => {
              select.addEventListener('change', function (e) {
                const name = this.getAttribute('name');
                const { value } = e.target;
                const index = fieldsFilter.findIndex(
                  (filter) => filter.field === name
                );
                if (index === -1) {
                  fieldsFilter.push({ value, field: name, type: '=' });
                } else {
                  if (value) {
                    fieldsFilter[index].value = value;
                  } else {
                    fieldsFilter.splice(index, 1);
                  }
                }
                updateTableFilters();
              });
            });

            filterSlot.appendChild(dropdownFilters);
          }

          if (searchInput) {
            searchInput.addEventListener('change', (event) => {
              updateTableFilters();
            });

            searchInput.addEventListener('input', (event) => {
              const value = event.target.value.trim();
              if (value) {
                return;
              }
              updateTableFilters();
            });
          }

          function updateTableFilters() {
            const searchValue = searchInput.value.trim();
            const searchFilters = searchValue
              ? searchFields.map((field) => ({
                  field,
                  value: searchValue,
                  type: 'like',
                }))
              : null;
            const filters = !searchFilters
              ? fieldsFilter
              : [...fieldsFilter, searchFilters];
            console.log(filters);
            table.setFilter(filters);
          }
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
