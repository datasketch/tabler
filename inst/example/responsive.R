library(shiny)
library(tabler)

ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = "1DRRBG4WynDH8c_fg1GwYKjbhn4tlj2QE84w8p13f4Sk", rowsByPage = 15)
  )
}

shinyApp(ui = ui, server = server)
