const express = require("express");

const router = express.Router();

// NOTE: This is some sample routes only.
// Should add routes and actions as needed.

router.get("/v1/ping", (req, res) => {
  res.status(200).send({
    status: {
      code: 200,
      message: "OK"
    },
    data: req.query
  });
});

router.post("/v1/ping", (req, res) => {
  res.status(200).send({
    status: {
      code: 200,
      message: "OK"
    },
    data: req.body
  });
});

router.put("/v1/ping/:id", (req, res) => {
  res.status(200).send({
    status: {
      code: 200,
      message: "OK"
    },
    data: req.params.id
  });
});

router.delete("/v1/ping/:id", (req, res) => {
  res.status(200).send({
    status: {
      code: 200,
      message: "OK"
    },
    data: req.params.id
  });
});

module.exports = router;
