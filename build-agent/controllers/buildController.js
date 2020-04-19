const { runActions } = require('../utils/actions');

const postBuild = (req, res) => {
  try {
    const { body } = req;
    runActions(body);

    res.status(200).json({});
  } catch (error) {
    res
      .status(error.status || 400)
      .json({ message: error.message, status: error.status || 400 });
  }
};

module.exports = { postBuild };
