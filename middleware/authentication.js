const checkLoggedIn = (req, res, next) => {
    console.log(req.session.user)
    if(!req.session.user) {
        res.json({error: 'session expired'})
       
    }
    else {
        next()
    }
}

module.exports = {checkLoggedIn}