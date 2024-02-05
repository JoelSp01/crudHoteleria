const express = require("express");
const router = express.Router();
const User = require("../models/users");

//viajar a la vista index
router.get("/", async (req, res) => {
  res.render("index");
});

//Agregar Reservacion
router.post("/add", async (req, res) => {
  try {
    const user = new User({
      Nombre: req.body.Nombre,
      CheckIn: req.body.CheckIn,
      CheckOut: req.body.CheckOut,
      Personas: req.body.Personas,
      Cuartos: req.body.Cuartos,
    });
    await user.save();
    req.session.message = {
      type: "success",
      message: "Reservacion Agregada Con Exito!",
    };
    res.redirect("/reservaciones");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Mostrar Reservaciones
router.get("/reservaciones", async (req, res) => {
  try {
    const users = await User.find();
    res.render("reservaciones", { users: users, title: "Reservaciones" });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Editar Reservacion
router.get("/edit/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.render("editReservacion", { user: user });
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Actualizar Reservacion
router.post("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
      await User.findByIdAndUpdate(id, {
      Nombre: req.body.Nombre,
      CheckIn: req.body.CheckIn,
      CheckOut: req.body.CheckOut,
      Personas: req.body.Personas,
      Cuartos: req.body.Cuartos,
    });

    req.session.message = {
      type: "success",
      message: "Reservacion Actualizada Con Exito!",
    };
    res.redirect("/reservaciones");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

//Eliminar Reservacion
router.get("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    req.session.message = {
      type: "success",
      message: "Reservacion Eliminada Con Exito!",
    };
    res.redirect("/reservaciones");
  } catch (error) {
    console.error(error);
    res.json({ message: error.message, type: "danger" });
  }
});

module.exports = router;
