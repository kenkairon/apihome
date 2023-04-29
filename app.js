const express = require('express')
const dotenv = require('dotenv');
const morgan = require('morgan')
dotenv.config({ path: './env/.env' });
const app = express();
app.use(express.json())
const conexion = require('./database/db')
app.use(morgan('dev'))

//BACKEND USUARIOS

//Presentar la tabla profesiones Back end SELECCIONANDO TODA LA TABLA
app.get('/api/v1/profe', async(req,res)=>{
     //ingresa la consulta en el back end
     await conexion.query('SELECT * FROM profesiones',(error,resp)=>{
        if (error){
            res.json({error})
        }else {
                res.json(resp.rows)
            }
        });
})
// CONSULTA A LA API PARA CARGAR DATOS DE FORMULARIO AL EDITAR VA A LA EDICIÓN EDITAR
//Back
app.get("/api/v1/profe/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await conexion.query("SELECT * FROM profesiones where id=$1", [id]);
        res.json(resultado.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
//DELETE PERSONAS

app.delete("/api/v1/profe/:id", (req, res) => {
    const { id } = req.params
    try {
        const results = conexion.query("DELETE FROM producto where id=$1", [id], (error, results, fields) => {
            if (error) throw error;
            res.json(results.rows);
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});
//UPDATE PERSONAS
//--------------------------------------------------------------------------------------------
// app.put("/api/v1/profe/edit/:id", async(req, res) => {
//     const { id } = req.params;
//     console.log(req.body)
//     const {nombre} = req.body;
//     try {
//         await conexion.query(
//             "UPDATE  profesion SET nombre=$1 where id=$2",
//             [nombre,id],
//             (error, results, fields) => {
//                 if (error) throw error;
//                 res.json(results.rows);
//                 console.log(results.rows);
//             }
//         );
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Server Error');
//     }
// });
app.listen(5007, () => {
    console.log('server run')
})

