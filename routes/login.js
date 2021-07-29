const express = require('express')
const ActiveDirectory = require('activedirectory');

const router = express.Router()


router.get('/', (req, res) => {
    res.send('Hello I am login')
})

router.post('/', async(req, res) => {

    const config = {
        url: 'ldap://192.168.100.23:389',
        baseDN: 'dc=hfbultd,dc=co, dc=ug'
    };

    const ad = new ActiveDirectory(config);
    const username = req.body.username
    const password = req.body.password

    try {

        // Authenticate
        await ad.authenticate(username, password, function(err, auth) {
            if (err) {
                let errorMessage = JSON.stringify(err)
                console.log(`AUTH ERROR ${errorMessage}`)


                res.render('index', { errorMessage })
            }
            if (auth) {
                console.log('Authenticated!');
                let errorMessage = JSON.stringify(auth)
                console.log(`${errorMessage}`)

                res.render('dashboard', { errorMessage })
            } else {
                let errorMessage = 'Authentication failed!'
                console.log(`AUTH ERROR ${errorMessage}`)
                res.render('index', { errorMessage })
            }
        });
    } catch (err) {
        console.log(`SYSTEM ERROR ${err}`)
        let errorMessage = err

        res.render('/', { errorMessage })

    }



})

module.exports = router