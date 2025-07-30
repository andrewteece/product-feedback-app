// lib/api.ts
export async function toggleUpvoteMock(
  id: number,
  upvoted: boolean
): Promise<{ success: boolean }> {
  await new Promise((res) => setTimeout(res, 500)); // fake delay
  console.log(`API: toggled upvote for ${id} to ${!upvoted}`);
  return { success: true };
}
