export const featuredVideos = [
  {
    id: 'NdStzorhz-M',
    title: 'Googlies on Google',
    description: 'Simple questions with surprising answers. Be the first to search for the answers or simply search "Googlies" to stay ahead. ',
    thumbnailUrl: '/googlies-on-google.jpg',
  },
  // {
  //   id: 'lykPixgrD8Y',
  //   title: 'Googlies on Google',
  //   description: '解密 Durov 的挑战',
  //   thumbnailUrl: 'https://img.youtube.com/vi/lykPixgrD8Y/maxresdefault.jpg',
  // },
];

export interface FeaturedVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
}
