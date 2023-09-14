import { edgeServerAppPaths } from "next/dist/build/webpack/plugins/pages-manifest-plugin"
import { FormEvent, useState } from "react"
import { Form, Button } from "react-bootstrap"
import { Category } from "../../../typings"

export default function LogForm () {

    //Create state for category to be added.
    const [categories, setCategories] = useState<Category[] | null | undefined | string>(null)


    // Handle Submit Category
    const handleSubmitCategory = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()

        const catData = new FormData(e.target as HTMLFormElement)
        const category = catData.get('category')?.toString()

        
        if (category) {
            setCategories(categories + category)
        }
        

        console.log(categories)
    }

    // Handle Submit subCategory
    const handleSubmitSubCategory = (e: FormEvent<HTMLElement>) => {
        e.preventDefault()

        const catData = new FormData(e.target as HTMLFormElement)
        const subCategory = catData.get('subcategory')?.toString()

        console.log(subCategory)

    }

    // Submission of log.
    const handleSubmitLog = () => {
        console.log('Submitted!!!')
    }


    return (
        <>
            {/* CATEGORY */}
            <Form onSubmit={(e) =>handleSubmitCategory(e)}>
                <Form.Group>
                    <Form.Label>Create Category</Form.Label>
                    <Form.Control
                        name='category'
                        placeholder='Create a category...'                
                    />
                </Form.Group>
                <Button type="submit" className="mb-3">Submit</Button>
            </Form>
            {/* SUBCATEGORY */}
            {/* Map out the categories and return a form element underneath each one for subcategory*/}
            <Form onSubmit={(e) =>handleSubmitSubCategory(e)}>
                <Form.Group>
                    <Form.Label>Create Sub-Category</Form.Label>
                    <Form.Control
                        name='subcategory'
                        placeholder='Create a subcategory...'                
                    />
                </Form.Group>
                <Button type="submit" className="mb-3">Submit</Button>
            </Form>
        </>
    )
}