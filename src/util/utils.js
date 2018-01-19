export function getFullName (member) {
  return member.user.username + '#' + member.user.discriminator
}
