// This file sends the page to res. Brick building to do.
// Esse arquivo envia a página para a resposta. Legos a serem montados.

exports.mainPage = (req, res, next) => {
    res.render('index')
    next()
}
