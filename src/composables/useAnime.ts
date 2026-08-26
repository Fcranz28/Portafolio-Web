import { onUnmounted } from 'vue';
import anime from 'animejs';

export function useAnime() {
  const activeAnimations: any[] = [];

  const runAnimation = (params: anime.AnimeParams) => {
    const instance = anime(params);
    activeAnimations.push(instance);
    return instance;
  };

  const createTimeline = (params?: anime.AnimeTimelineParams) => {
    const tl = anime.timeline(params);
    activeAnimations.push(tl);
    return tl;
  };

  onUnmounted(() => {
    activeAnimations.forEach((anim) => {
      try {
        if (typeof anim.pause === 'function') anim.pause();
        anime.remove(anim.animatables?.map((a: any) => a.target) || []);
      } catch (e) {
        // ignore
      }
    });
    activeAnimations.length = 0;
  });

  return {
    anime,
    runAnimation,
    createTimeline,
  };
}

export default useAnime;
