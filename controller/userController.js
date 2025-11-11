function insertUser(req, res) {
  //const { firstName, lastName, email } = req.body;
  return res.status(200).json({ message: "user added successfully" });
}

module.exports = { insertUser };
