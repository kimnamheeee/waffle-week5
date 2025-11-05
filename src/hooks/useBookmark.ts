import { useState } from 'react';
import { addBookmark, deleteBookmark } from '../api/post/bookmark';

export const useBookmark = () => {
	const [loadingPostIds, setLoadingPostIds] = useState<Set<string>>(new Set());

	const toggleBookmark = async (
		postId: string,
		isCurrentlyBookmarked: boolean,
		onSuccess?: () => void,
		onError?: (error: unknown) => void,
	) => {
		if (loadingPostIds.has(postId)) {
			return; // 이미 처리 중이면 무시
		}

		setLoadingPostIds((prev) => new Set(prev).add(postId));

		try {
			if (isCurrentlyBookmarked) {
				await deleteBookmark(postId);
			} else {
				await addBookmark(postId);
			}
			onSuccess?.();
		} catch (error) {
			console.error('Failed to toggle bookmark:', error);
			onError?.(error);
		} finally {
			setLoadingPostIds((prev) => {
				const next = new Set(prev);
				next.delete(postId);
				return next;
			});
		}
	};

	return {
		toggleBookmark,
		isLoading: (postId: string) => loadingPostIds.has(postId),
	};
};
