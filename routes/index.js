const Router = require('express');

const router = Router();

router.get('/prueba', (req,res) =>{
            res.send("HOLA MUNDO")
});


router.get('/prueba2', (req,res) =>{
    res.json({
        codigo  : 1 ,
        mensaje : "exito"
    })
})

module.exports = router;