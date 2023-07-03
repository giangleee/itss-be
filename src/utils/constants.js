const JOB_TYPE = {
  SITTER: 0,
  COOKER: 1,
  BOTH: 2,
};

const GENDER = {
  MAN: 'Male',
  WOMAN: 'Female',
  NONE_OF_THEM_ABOVE: 'Other',
};

const STATUS_CODE = {
  IS_ON_HOLD: 0,
  IS_RUNNING: 1,
  IS_COMPLETED: 2,
  IS_EXPIRED: 3,
};

const SALT_ROUNDS = 10

module.exports = {
  JOB_TYPE,
  GENDER,
  STATUS_CODE,
  SALT_ROUNDS
}
