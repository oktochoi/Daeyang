/**
 * 영상 URL을 embed 재생에 사용할 수 있는 형태로 변환합니다.
 * - YouTube: watch URL / youtu.be → embed URL (autoplay 지원)
 * - Vimeo: vimeo.com/123 → embed URL
 * - 그 외: 직접 URL (video 태그용)
 */
export type VideoEmbedType = 'youtube' | 'vimeo' | 'direct';

export function getVideoEmbedInfo(url: string): { type: VideoEmbedType; embedSrc: string; directSrc?: string } | null {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();

  // YouTube: youtube.com/watch?v=ID, youtu.be/ID
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const id = ytMatch[1];
    return {
      type: 'youtube',
      embedSrc: `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`,
    };
  }

  // Vimeo: vimeo.com/123456
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) {
    const id = vimeoMatch[1];
    return {
      type: 'vimeo',
      embedSrc: `https://player.vimeo.com/video/${id}?autoplay=1`,
    };
  }

  // 직접 URL (mp4 등)
  if (u.startsWith('http://') || u.startsWith('https://')) {
    return {
      type: 'direct',
      embedSrc: '',
      directSrc: u,
    };
  }

  return null;
}

/**
 * 영상 URL에서 썸네일 이미지 URL을 반환합니다.
 * YouTube는 공식 썸네일 사용, Vimeo/직접 URL은 null(카드에서 재생 아이콘 표시).
 */
export function getVideoThumbnailUrl(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const u = url.trim();
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  if (ytMatch) {
    const id = ytMatch[1];
    return `https://img.youtube.com/vi/${id}/mqdefault.jpg`;
  }
  return null;
}
