#' Create a table based a JSON retrieved from a Google Sheet
#'
#'
#' @import htmlwidgets
#'
#' @export
tabler <- function(sheetId = NULL, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    sheetId = sheetId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'tabler',
    x,
    width = width,
    height = height,
    package = 'tabler',
    elementId = elementId
  )
}

#' Shiny bindings for tabler
#'
#' Output and render functions for using tabler within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a tabler
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name tabler-shiny
#'
#' @export
tablerOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'tabler', width, height, package = 'tabler')
}

#' @rdname tabler-shiny
#' @export
renderTabler <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, tablerOutput, env, quoted = TRUE)
}