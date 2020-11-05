library(shiny)
library(jsonlite)
library(tabler)

# More info on docs: http://tabulator.info/docs/4.8/localize#define

langs <- '{
  "es": {
    "pagination": {
      "page_title": "Mostrar página",
      "first": "Primera",
      "first_title": "Primera página",
      "last": "Última",
      "last_title": "Última página",
      "prev": "Anterior",
      "prev_title": "Paǵina anterior",
      "next": "Siguiente",
      "next_title": "Página siguiente",
      "all": "Todo"
    }
  }
}'


ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = "1DRRBG4WynDH8c_fg1GwYKjbhn4tlj2QE84w8p13f4Sk",
           rowsByPage = 15,
           localization = list(
             locale = "es",
             langs = fromJSON(langs)
           ))
  )
}

shinyApp(ui = ui, server = server)
