export async function getWithdrawalFees(id: ID) {
  if (id === 1) return { ethFees: 7, tokenFees: 10 };
  else return { ethFees: 1, tokenFees: 1 };
}
