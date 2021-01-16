module.exports = ({ member, token, rank }) => ({
  member: {
    ...member,
    password: undefined,
    rank: rank + 1,
  },
  token,
});
