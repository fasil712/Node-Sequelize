const Message = require('../model/Message');

exports.getMessages = (req, res) => {
    res.render('message', {
        style: 'user.css'
    });
}

exports.sendMessage = (req, res) => {
    let newMessage = {
      messageType: req.body.message_type,
      fullName: req.body.fullName,
      MRN: req.body.mrn,
      Date: req.body.date_of_reg,
    };

    Message.create(newMessage).then((result) => {
        console.log('message added!');
    }).catch((err) => {
        console.log(err);
    });

    res.status(200).redirect('/getMessage');
}