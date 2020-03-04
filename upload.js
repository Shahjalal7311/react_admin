module.exports = (req, res) => {
  // console.log(req.files.length)
  // for (let i = 0; i < req.files.length; i += 1) {
  //   req.files[i].originalname
  // }
  return res.status(200).send({ success: true });
};