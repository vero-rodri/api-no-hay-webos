const createError = require('http-errors');
const { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge } = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');
const Evidence = require('../models/evidence.model');
const User = require('../models/user.model.js');

module.exports.list = (req, res, next) => {
  
  Challenge.find()
    .populate('owner')
    .populate('usersChallenge')
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  
  let challenge;
  switch ( req.body.type ) {
    case 'default': {
       challenge = new Challenge({...req.body, owner:req.user.id});
      break;
    }
    case 'punctual': {
      challenge = new PunctualChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'periodic': {
      challenge = new PeriodicChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'expiration': {
      challenge = new ExpirationChallenge({...req.body, owner:req.user.id});
      break;
    }
  }
  if (req.file) {
    challenge.photo = req.file.secure_url;
  }
  challenge.save()
    .then(challenge => res.status(201).json(challenge))
    .catch(next)
}


module.exports.detail = (req, res, next) => {
  Challenge.findById(req.params.id)
    .populate('usersChallenge')
    .then(challenge => res.status(200).json(challenge))
    .catch(next)
}

const ObjectIdInArray = (objId, arr) => {
  let arrAux = arr.map(objId => JSON.stringify(objId))
  let objIdAux = JSON.stringify(objId);
  return (arrAux.includes(objIdAux))
}


module.exports.addToLikes = (req, res, next) => {

  User.findById(req.user.id)
    .then(user => {
      if (!ObjectIdInArray(req.params.id, user.challengesLiked)) {
        user.challengesLiked.push(req.params.id);
      } else {
        throw createError(409, 'this user already did click like');
      }
      return user.save()
        .then(user => {
          return Challenge.findByIdAndUpdate(req.params.id, {
            $inc: {likes: 1}
            }, {new: true})
              .then(challenge => res.json({itemsLiked: user.challengesLiked, likes: challenge.likes}))
        })
    })
    .catch(next);
};


module.exports.removeFromLikes = (req, res, next) => {
 
  User.findById(req.user.id)
    .then(user => {
      if (ObjectIdInArray(req.params.id, user.challengesLiked)) {
        user.challengesLiked = [...user.challengesLiked
          .filter(challenge => (JSON.stringify(challenge) != JSON.stringify(req.params.id)))]
      } else {
        throw createError(409, 'this user did not click like');   //ESTE ERROR LE HE PUESTO NUEVO, NO CAPTURADO EN EL FRONT..(PERO HARÏA FALTA?)
      }
      return user.save()
        .then(user => {
          return Challenge.findByIdAndUpdate(req.params.id, {
            $inc: {likes: -1}
            }, {new: true})
              .then(challenge => res.json({itemsLiked: user.challengesLiked, likes:challenge.likes}))  
        })    
    })
    .catch(next)
};


module.exports.addToViews = (req, res, next) => {
  Challenge.findByIdAndUpdate(req.params.id, {
    $inc: {views: 1}
    }, {new:true})
      .then(challenge => res.json(challenge))
      .catch(next)
}

