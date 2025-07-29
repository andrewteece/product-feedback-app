
import { z } from 'zod'

// Define the user schema with transform to rename `image` to `avatarUrl`
const UserSchema = z
  .object({
    name: z.string(),
    username: z.string(),
    image: z.string(), // incoming key
  })
  .transform(({ image, ...rest }) => ({
    ...rest,
    avatarUrl: image,
  }))

// Define reply schema using the transformed user
const ReplySchema = z.object({
  content: z.string(),
  replyingTo: z.string(),
  user: UserSchema,
})

// Comment schema
const CommentSchema = z.object({
  id: z.number(),
  content: z.string(),
  user: UserSchema,
  replies: z.array(ReplySchema).optional(),
})

// Feedback schema
export const FeedbackSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  category: z.string(),
  status: z.string(),
  upvotes: z.number(),
  comments: z.array(CommentSchema).optional(),
})

// Root wrapper schema
export const FeedbackDataSchema = z.object({
  productRequests: z.array(FeedbackSchema),
})
