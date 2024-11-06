// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { featuredVideos } from '@/config/videos';

interface YouTubeEmbedProps {
  thumbnailUrl?: string;
  // ... 其他属性
}

export const metadata: Metadata = {
  title: 'puzzle durov today',
  description: 'Here Is Todays "Major" Telegram Game Puzzle Durov Combo.',
}

export default function Home() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  const allPostsData = getSortedPostsData().slice(0, 6)

  return (
    <div className="container mx-auto py-12 space-y-16">
      
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          puzzle durov today
        </h1>
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">Here Is Today&apos;s &quot;Major&quot; Telegram Game Puzzle Durov Combo.</h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
        Here Is Today&apos;s &quot;Major&quot; Telegram Game Puzzle Durov Combo,MAJOR is now featured in Bitget Pre-Market, giving users the chance to engage in OTC token trades ahead of spot trading. This is an excellent opportunity to enhance your returns!.
        </p>
      </section>
      <section className="my-12">
        <h2 className="text-2xl font-bold mb-6 text-center">精选视频</h2>
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {featuredVideos.map((video) => (
            <YouTubeEmbed
              key={video.id}
              videoId={video.id}
              title={video.title}
              description={video.description}
              className="w-full shadow-lg rounded-lg overflow-hidden"
              thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </div>
      </section>

      <ResourceList resources={resources} />
      <ArticleList articles={allPostsData} />

    </div>
  )
}