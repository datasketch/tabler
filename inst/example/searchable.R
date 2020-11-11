library(shiny)
library(tabler)

ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = '1MK7XKswxHrI1S7EWJexlb2ZEB6-s-w8sqErvnayhRGE',
           paginate = FALSE,
           search = list(enable = TRUE,
                         fields = list("country", "capital"),
                         placeholder = "Search by country or capital city"))
  )
}

shinyApp(ui = ui, server = server)
