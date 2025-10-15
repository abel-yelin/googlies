// pages/index.js
import fs from 'fs'
import path from 'path'
import { getSortedPostsData } from '@/lib/posts'
import ResourceList from '@/components/ResourceList'
import ArticleList from '@/components/ArticleList'
import { Metadata } from 'next'
import { YouTubeEmbed } from '@/components/YouTubeEmbed';
import { featuredVideos } from '@/config/videos';
import { TypeWriter } from '@/components/TypeWriter'

interface YouTubeEmbedProps {
  thumbnailUrl?: string;
  // ... 其他属性
}

export const metadata: Metadata = {
  title: 'Googlies on Google',
  description: 'Googlies on Google: A curiosity-driven game for search.',
}

export default function Home() {
  const resourcesPath = path.join(process.cwd(), 'data', 'json', 'resources.json')
  const resources = JSON.parse(fs.readFileSync(resourcesPath, 'utf8'))
  const allPostsData = getSortedPostsData().slice(0, 6)

  return (
    <div className="container mx-auto py-12 space-y-16">
      
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <TypeWriter 
            text="Googlies on Google" 
            delay={150}  // 可以调整打字速度
            className="inline-block"
          />
        </h1>
        <h2 className="text-2xl tracking-tighter sm:text-3xl md:text-3xl lg:text-3xl">
          Here Is Todays Simple questions with surprising answers. Be the first to search for the answers or simply search Googlies to stay ahead.
        </h2>
        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
          50 Googlies—quirky questions that seem to have obvious answers, but hold surprising truths when searched for!.
        </p>
      </section>
      <section className="my-12">
        <div className="text-center">
          <a href="https://www.cpmcalculator.site/" className="bg-red-500 text-white font-bold py-4 px-8 rounded text-center hover:scale-110 transition-transform duration-300">here we go</a>
        </div>
        <div className="space-y-8 max-w-5xl mx-auto px-4">
          {featuredVideos.map((video) => (
            <YouTubeEmbed
              key={video.id}
              videoId={video.id}
              title={video.title}
              description={video.description}
              className="w-full"
              thumbnailUrl={video.thumbnailUrl}
            />
          ))}
        </div>
      </section>
      <ArticleList articles={allPostsData} />
      <ResourceList resources={resources} />
    

    </div>
  )
}
