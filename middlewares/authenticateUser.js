module.exports = (req, res, next) => {
    if (!req.session.user) {
        req.session.message={
            type:'success',
            intro:'Success ! ',
            message:'You are IN ! Lets start ! '
        }

       
    }
    //else continue
    next();
  };