module.exports = (member, token) => ({
  member: {
    ...member,
    password: undefined,
  },
  token,
});
