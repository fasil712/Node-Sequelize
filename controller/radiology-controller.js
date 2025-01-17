
const { Op } = require('sequelize');
const Radiology = require('../model/Radiology');
const User = require('../model/User');
const Client = require("../model/Client");
const Request = require('../model/Request');

exports.getRadiology = async (req, res) => {
  const token = await req.cookies["access-token"];
    res.render('radiology-exam', {
      style: 'style.css',
      token: token
    });
}

exports.radiologyResult = async (req, res) => {
  const token = await req.cookies["access-token"];
    Radiology.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
      include: [
        {
          model: User,
        },
        {
          model: Client,
        },
      ],
      raw: true,
    })
        .then((result) => {
          console.log(result);
          res.render("radiology-result", {
            result: result,
            style: "style.css",
            script: "index.js",
            token: token
          });
      })
      .catch((err) => {
        console.log(err);
      });

};

exports.radiologySearch = async (req, res) => {
   const token = await req.cookies["access-token"];
   let query = req.body.mrn;
   console.log(query);

   Radiology.findAll({
     include: [
       {
         model: User,
       },
       {
         model: Client,
       },
     ],
     where: {
       MRN: query,
     },
     raw: true,
   })
     .then((result) => {
       res.render("radiology-result", {
         result: result,
         style: "style.css",
         token: token
       });
     })
     .catch((err) => {
       console.log(err);
     });
 };

exports.addRadiology = async (req, res) => {
  const token = await req.cookies["access-token"];
    let newRadiologyData = {
      MRN: req.body.mrn,
      UserId: req.body.uid,
      DateOfExam: req.body.date,
      TypeOfExam: req.body.exam_type,
      Technique: req.body.technique,
      Impression: req.body.impression,
      Finding: req.body.finding,
    };

    Radiology.create(newRadiologyData).then((result) => {
      console.log('radiology added!!!');
       return res.render("radiology-exam", {
         message: "data submitted successfully",
         style: "style.css",
         script: "index.js",
         token: token
       });
    }).catch((err) => {
      console.log(err);
       return res.render("radiology-exam", {
         wrong: "something goes wrong, try again, please",
         style: "style.css",
         script: "index.js",
         token: token
       });
    });
}

exports.getLabRequest = async (req, res) => {
  const token = await req.cookies["access-token"];
  Request.findAll({ where: { To: "radiology" } })
    .then((result) => {
      console.log(result);
      res.status(200).render("radiology-request", {
        style: "style.css",
        result: result,
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.labRequestSearch = async (req, res) => {
  const token = await req.cookies["access-token"];
  let query = req.body.mrn;
  Request.findAll({
    where: { [Op.or]: [{ MRN: query }, { FullName: query }] },
    raw: true,
  })
    .then((result) => {
      res.render("radiology-request", {
        result: result,
        style: "style.css",
        token: token
      });
    })
    .catch((err) => {
      console.log(err);
    });
};