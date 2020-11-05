# tabler

HTMLWidget to render tables from Google Sheets database

## Install

```
devtools::install_github("datasketch/tabler")
```

## Usage

```r
library(shiny)
library(tabler)

ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = 'some-google-sheet-public-id')
  )
}

shinyApp(ui = ui, server = server)
```

The `tabler` function accept the following parameters

| param               | default  | description                                         |
|---------------------|----------|-----------------------------------------------------|
| sheetId             | NULL     | Public Google Sheets id                             |
| rowsByPage          | 10       | Rows shown by page when `paginate` is set to `TRUE` |
| paginate            | TRUE     | Toggles pagination on or off                        |
| localization.langs  | NULL     | Translations dictionary                             |
| localization.locale | NULL     | Set a key from the `localizations.langs` object     |
| search.enable       | FALSE    | Render search input                                 |
| search.fields       | c()      |                                                     |
| search.placeholder  | NULL     | Search input placeholder                            |

## Examples

- [Basic](./inst/example/sample.R)
- [Pagination](./inst/example/pagination.R)
- [Localization](./inst/example/localization.R)
- [Search](./inst/example/searchable.R)

## Dependencies

- [Tabulator](https://github.com/olifolkerd/tabulator)
- [gsheetreader](https://github.com/datasketch/gsheetreader)

## Roadmap

- [ ] Document `tabler` function
- [ ] Render table from dataframe
