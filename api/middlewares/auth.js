module.exports = (req, res, next) => {
  const token =
    (req.body && req.body.access_token) ||
    (req.query && req.query.access_token) ||
    req.headers["x-access-token"];

  // TODO: Check for valid access token
  // If valid, continue with `next()`
  // Otherwise return with 403 respond;

  // TODO: Implements JWT auth later

  if (!token) {
    res.status(403).send({
      status: {
        code: 403,
        message: "Not Authorized"
      }
    });
  }

  if (token) {
    next();
  }
}
