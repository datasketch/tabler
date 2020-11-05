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

| param        | default                           | description                                         |
|--------------|-----------------------------------|-----------------------------------------------------|
| sheetId      | NULL                              | Public Google Sheets id                             |
| rowsByPage   | 10                                | Rows shown by page when `paginate` is set to `TRUE` |
| paginate     | T                                 | Toggles pagination on or off                        |
| localization | list(locale = NULL, langs = NULL) | See an [example](./inst/example/localization.R)     |

## Dependencies

- [Tabulator](https://github.com/olifolkerd/tabulator)
- [gsheetreader](https://github.com/datasketch/gsheetreader)

## Roadmap

- [ ] Document `tabler` function
- [ ] Render table from dataframe
