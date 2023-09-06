"use server"
// import { Content } from "../typings";
import db from '../src/app/modules/db'


export default async function submitForm(e: string) {

    // Save the event as a variable.
    const newContent = e

    // Posting the new entry.
    await db.post.create({
        data: {content: newContent}
    })

    // Fetching all posts from the database.
    const posts = await db.post.findMany({ orderBy: {createdAt: 'desc'}})
    
    // Return the data posted.
    return posts
}