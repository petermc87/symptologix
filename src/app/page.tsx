import Image from 'next/image'
import styles from './page.module.css'
import db from './modules/db'
import { faker } from '@faker-js/faker'
import { revalidatePath } from 'next/cache'
import Button from './components/Button'

export default async function Home() {
  // Fetching data from the database.
  const posts = await db.post.findMany({ orderBy: {createdAt: 'desc'}})

  //  Server side function -> creates the post request to the database.
  const generatePosts = async () => {
    'use server'

    await db.post.createMany({
      data: [
        { content: faker.lorem.sentence() },
        { content: faker.lorem.sentence() },
        { content: faker.lorem.sentence() },
      ]
    })
    revalidatePath('/')
  }

  return (
    <main className={styles.main}>
      <Button onClick={generatePosts}>Generate Posts</Button>
      {posts.map(post => (
        <div key={post.id}>{post.content}</div>
      ))}
    </main>
  )
}
