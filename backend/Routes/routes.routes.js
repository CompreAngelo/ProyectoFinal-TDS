import express from "express";
import { obtenerDatosConexion } from "../Controller/prueba.js";
import {UsuarioController} from "../Controller/UsuarioController.js"
import {MultaController} from "../Controller/MultaController.js"
import {RequerimientoController} from "../Controller/requerimientoController.js";
import {ReporteController} from "../Controller/reporteController.js";
import {ReporteAgenteController} from "../Controller/reporte_agenteController.js";


const router = express.Router();
const usuario = new UsuarioController();
const multa = new MultaController();
const requerimiento = new RequerimientoController();
const reporte = new ReporteController()

const reportaAgente = new ReporteAgenteController();

router.get("/conexion",  obtenerDatosConexion);

router.get("/user",(rq, rs)=>{
    usuario.getAllUsers(rq,rs)
});

router.get("/requerimiento",(rq, rs)=>{
    requerimiento.getAllRequerimientos(rq,rs)
});

router.get("/reporteAgente", (rq, rs) => { 
    reporteAgente.getAllReportesAgente(rq, rs); 
});

router.post("/createrequerimiento",(rq, rs)=>{
    requerimiento.createRequerimiento(rq,rs)
});

router.post('/registerAgent', (req, res) => {
    usuario.registerAgent(req, res);
});

router.get("/reporte",(rq, rs)=>{
    reporte.getAllReportes(rq,rs)
})
router.post('/login', (req, res) => usuario.login(req, res));
router.post('/reset-password', (req, res) => usuario.updateUserByNewPassword(req, res));
router.post('/getUserNameByCedula', (req, res) => usuario.getUserNameByCedula(req, res));
router.post('/createMulta', (req, res) => multa.createMulta(req, res));

router.post('/multaAgente', (req, res) => multa.getMultaByUser(req, res));


router.post("/register", (req, res) => {
    usuario.registerUser(req, res);
});

router.get('/agents', (req, res) => usuario.getAllAgents(req, res));
router.get('/multa', (req, res ) =>multa.getAllMultas(req, res));

router.get('/allmultas', (req, res) => multa.getAllMultas(req, res));
router.get('/updateAgent', (req, res) => usuario.updateAgentDetails(req, res));
router.post("/user/:id", (req, res) => { 
    usuario.updateUser(req, res);
});

router.post('/userimage/:id', (req, res) => {
    usuario.uploadAndStoreImage(req, res);
});

router.post('/vehicleimage/:id', (req, res) => {
    usuario.uploadAndStoreImageVehicle(req, res);
});

router.get('/userMulta/:id', (req, res) => { multa.getAllMultas(req, res) });
router.get('/userMultaInfo/:id', (req, res) => { usuario.getAllUsers(req, res) });

router.get('/multasUser', (req, res) => { multa.getMultaByCedulaUsuario(req, res)});

router.post('/updateMulta', (req, res) => multa.marcarMultaComoPagada(req, res));

router.put('/updateAgent/:id', (req, res) => usuario.updateAgent(req, res));

router.get('/nameAgent', (req, res) => multa.getNameAgent(req, res));

router.post('/createReporte', (req, res) => reportaAgente.createReporteAgente(req, res));

router.get('/reportesAgente', (req, res) => reportaAgente.getAllReportesAgente(req, res));

export default router;