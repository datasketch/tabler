library(shiny)
library(tabler)

ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = '1MK7XKswxHrI1S7EWJexlb2ZEB6-s-w8sqErvnayhRGE')
  )
}

shinyApp(ui = ui, server = server)
