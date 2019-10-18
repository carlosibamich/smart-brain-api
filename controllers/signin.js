const handleSignIn = (req, res, knex, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('Please enter your information in both fields');
  }

  knex.select('email', 'hash')
  .from('login')
  .where('email', '=', email)
  .then(data => {
    const isValid = bcrypt.compareSync(password, data[0].hash);
    if (isValid) {
      return knex.select('*').from('users')
      .where('email', '=', email)
      .then(user => {
        console.log(user);
        res.json(user[0])
      })
      .catch(err => res.status(400).json('Unable to get user'))
    } else {
      res.json('Incorrect email or password');
    }
  })
  .catch(err => res.status(400).json('Something went wrong. Please try again.'))
}

module.exports = {
  handleSignIn
}
