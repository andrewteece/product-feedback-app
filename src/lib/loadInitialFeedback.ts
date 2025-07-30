import data from '@/lib/data/data.json';
import type {
  Feedback,
  Category,
  Status,
  Comment,
  User,
} from '@/types/feedback';
import type {
  RawFeedback,
  RawUser,
  RawComment,
  RawReply,
} from '@/types/rawFeedback';

function mapUser(user: RawUser): User {
  return {
    name: user.name,
    username: user.username,
    avatarUrl: user.image, // convert "image" to "avatarUrl"
  };
}

function mapComments(rawComments: RawComment[]): Comment[] {
  return rawComments.map((comment) => ({
    id: comment.id,
    content: comment.content,
    user: mapUser(comment.user),
    replies: comment.replies?.map((reply: RawReply) => ({
      content: reply.content,
      replyingTo: reply.replyingTo,
      user: mapUser(reply.user),
    })),
  }));
}

export function loadInitialFeedback(): Feedback[] {
  return (data.productRequests as RawFeedback[]).map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category as Category,
    status: item.status as Status,
    upvotes: item.upvotes,
    upvoted: false,
    comments: item.comments ? mapComments(item.comments) : [],
  }));
}
