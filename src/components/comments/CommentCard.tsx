'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Comment } from '@/types/feedback';
import ReplyForm from './ReplyForm';
import { useUserStore } from '@/store/userStore';
import { useFeedbackStore } from '@/store/feedbackStore';
import { toast } from 'sonner';

interface Props {
  comment: Comment;
  feedbackId: number;
}

export default function CommentCard({ comment, feedbackId }: Props) {
  const [showReply, setShowReply] = useState(false);

  const user = useUserStore((s) => s.currentUser);
  const addReply = useFeedbackStore((s) => s.addReply);

  const handleReplySubmit = (replyText: string) => {
    const reply = {
      content: replyText,
      replyingTo: comment.user.username,
      user,
    };

    addReply(feedbackId, comment.id, reply);
    setShowReply(false);
    toast.success('Reply posted!');
  };

  return (
    <li className='border-b border-[var(--border-card)] pb-6'>
      {/* Top-level comment */}
      <div className='flex gap-4'>
        <Image
          src={comment.user.avatarUrl}
          alt={comment.user.name}
          width={40}
          height={40}
          className='rounded-full'
        />
        <div className='flex-1'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='font-bold text-sm'>{comment.user.name}</p>
              <p className='text-[var(--text-muted)] text-sm mt-1'>
                {comment.content}
              </p>
            </div>
            <button
              onClick={() => setShowReply((prev) => !prev)}
              className='text-sm font-semibold text-[var(--btn-primary)] hover:underline'
            >
              Reply
            </button>
          </div>

          {showReply && (
            <div className='mt-4'>
              <ReplyForm
                onSubmit={handleReplySubmit}
                onCancel={() => setShowReply(false)}
              />
            </div>
          )}

          {/* Replies (if any) */}
          {comment.replies && comment.replies.length > 0 && (
            <ul className='mt-6 space-y-4 border-l border-[var(--border-card)] pl-4 ml-6'>
              {comment.replies.map((reply, index) => (
                <li key={index} className='flex gap-4'>
                  <Image
                    src={reply.user.avatarUrl}
                    alt={reply.user.name}
                    width={32}
                    height={32}
                    className='rounded-full'
                  />
                  <div>
                    <p className='font-bold text-sm'>{reply.user.name}</p>
                    <p className='text-[var(--text-muted)] text-sm mt-1'>
                      <span className='text-[var(--btn-primary)] font-medium mr-1'>
                        @{reply.replyingTo}
                      </span>
                      {reply.content}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </li>
  );
}
