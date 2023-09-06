"use client"
import { FormEvent, useTransition } from 'react'
import { Form } from 'react-bootstrap'
import Button from './Button'
import { Content } from '../../../typings'
import db from '../modules/db'

// Passing the types declared above into the function. -> The
// type being passed in is the function.
export default function InputForm (){

  // Enable transition hook for transitioning phase.
  const [isPending, startTransition] = useTransition()

  // Add handle submit function here.
    // Creating a post based on an input from the user.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      // 'use server'
       e.preventDefault()
  
      // Creating a new FormData instance from react and createing the event as 
      // a html type
       const formData = new FormData(e.target as HTMLFormElement)
       const inputQuery = formData.get("inputquery")?.toString()
  
       console.log(inputQuery)

       //Converting the content to types for postgres.
        const newContent: Content = {
        content: inputQuery
      }
  
      // Put this in a server side file
      // Try put this in a separate actuions folder.
      const data = await db.post.create({ 
          data: { content: newContent }
      })
  
      console.log(data)
    }

  
    return (
        // <Form onSubmit={handleSubmit}>
        <Form onSubmit={(e) => startTransition(() => handleSubmit(e))}>
          {isPending ? 
          <div>Submitting...</div>  
         : ''}
        <Form.Group className='mb-3'>
          <Form.Label>Create Input</Form.Label>
          <Form.Control 
            name='inputquery'
            placeholder='Enter any text'
          />
        </Form.Group>
        <Button type="submit" className='mb-3'>
          Submit
        </Button>
      </Form>
    )
}      
      



// ORIGINAL //

// // Passing the types declared above into the function. -> The
// // type being passed in is the function.
// export default function InputForm ({ handleSubmit}: SubmitFunction){

//   // Enable transition hook for transitioning phase.
//   const [isPending, startTransition] = useTransition()
  
//     return (
//         // <Form onSubmit={handleSubmit}>
//         <Form onSubmit={(e) => startTransition(() => handleSubmit(e))}>
//           {isPending ? 
//           <div>Submitting...</div>  
//          : ''}
//         <Form.Group className='mb-3'>
//           <Form.Label>Create Input</Form.Label>
//           <Form.Control 
//             name='inputquery'
//             placeholder='Enter any text'
//           />
//         </Form.Group>
//         <Button type="submit" className='mb-3'>
//           Submit
//         </Button>
//       </Form>
//     )
// }      
      

