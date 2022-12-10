const ERR_BAD_REQUEST = {
  status: 400,
  title: 'Bad Request',
};

const ERR_NOT_FOUND = {
  status: 404,
  title: 'Not Found',
};

const ER_DUP_ENTRY = {
  status: 409,
  title: 'Conflict',
};

const GEN_ERR_BAD_REQUEST = (extraDetails) => ({
  ...ERR_BAD_REQUEST,
  ...extraDetails,
});

const GEN_ERR_NOT_FOUND = (extraDetails) => ({
  ...ERR_NOT_FOUND,
  ...extraDetails,
});

module.exports = {
  ERR_BAD_REQUEST,
  ERR_NOT_FOUND,
  ER_DUP_ENTRY,
  GEN_ERR_BAD_REQUEST,
  GEN_ERR_NOT_FOUND,
};
