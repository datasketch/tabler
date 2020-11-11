library(shiny)
library(tabler)

ui <- shinyUI(fluidPage(
  tablerOutput('tabler')
))

server <- function(input, output, session) {
  output$tabler <- renderTabler(
    tabler(sheetId = "1DRRBG4WynDH8c_fg1GwYKjbhn4tlj2QE84w8p13f4Sk",
           rowsByPage = 30,
           search = list(
             enable = TRUE,
             fields = list()
           ),
           # Prefer named list over named vector
           filters = list(
             list(label="Estado del proceso", field="estado_del_proceso"),
             list(label="Año firma del contrato", field="anno_firma_del_contrato")
             )
           )
  )
}

shinyApp(ui = ui, server = server)
