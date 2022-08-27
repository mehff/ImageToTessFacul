// Brick building! Will improve in the near future.
// Brincando com legos! Vou melhorar num futuro próximo.

async function setHomePage (req, res, next) {
    return new Promise((resolve, reject) => {
        res.locals.home = 1
        res.locals.headerIndex = "includes/index/headerIndex.ejs"
        res.locals.bodyIndex = "includes/index/bodyIndex.ejs"
        res.locals.footerIndex = "includes/index/footerIndex.ejs"
        resolve()
        next()
    })
}

exports.setHomePage = setHomePage
