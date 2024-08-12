import React, { useState } from "react";
import { Button, Checkbox, Label, Select, TextInput,Textarea } from "flowbite-react";
import { useLoaderData, useParams } from "react-router-dom";

const EditBooks=()=>{
    const {id}=useParams();
    const {bookTitle,authorName,imageURL,category,bookDescription,bookPDFUrl}=useLoaderData();

    const bookCategories=[
        "Fiction",
        "Non-Fiction",
        "Mistery",
        "Programming",
        "Science Fiction",
        "Fantasy",
        "Horror",
        "Bibliography",
        "Autobiography",
        "History",
        "Self-health",
        "Memoir",
        "Bussiness",
        "Children Books",
        "Travel",
        "Religion",
        "Art and Design"
    ]

    const [selectedBookCategory,setSelectedBookCategory]=useState(bookCategories[0]);
    const handleChangeSelectedValue=(event)=>{
       // console.log(event.target.value);
        setSelectedBookCategory(event.target.value);
    }
//handle book submission
const handleUpdate=(event)=>{
    event.preventDefault();
    const form=event.target;

    const bookTitle=form.bookTitle.value;
    const authorName=form.authorName.value;
    const imageURL=form.imageURL.value;
    const category=form.categoryName.value;
    const bookDescription=form.bookDescription.value;
    const bookPDFUrl=form.bookPDFUrl.value;
    const updateBookObj={
        bookTitle,authorName,imageURL,category,bookDescription,bookPDFUrl
    }
   // console.log(bookObj)
   // update book data
    fetch(`http://localhost:5000/book/${id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(updateBookObj)
    }).then(res=>res.json()).then(data=>{
        alert("Book is updated successfully");
    })
}
    return(
        <div className="px-4 my-12">
            <h2 className="mb-8 text-3xl font-bold">Update the book data</h2>

            <form onSubmit={handleUpdate} className="flex lg:w-[1000px] flex-col flex-wrap gap-4">
                {/* {first row} */}
                <div className="flex gap-8">
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="bookTitle" value="Book Title" />
                        </div>
                    <TextInput id="bookTitle" type="text"  name="bookTitle" placeholder="Book Name" required defaultValue={bookTitle}/>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="mb-2 block">
                            <Label htmlFor="authorName" value="Author Name" />
                        </div>
                    <TextInput id="authorName" type="text"  name="authorName" placeholder="Author Name" required defaultValue={authorName}/>
                    </div>
                </div>

                 {/* {Second row} */}
                 <div className="flex gap-8">
                    <div className="lg:w-1/2">
                        {/* {image url} */}
                        <div className="mb-2 block">
                            <Label htmlFor="imageURL" value="Book Image URL" />
                        </div>
                       <TextInput id="imageURL" type="text"  name="imageURL" placeholder="Book Image URL" required defaultValue={imageURL}/>
                    </div>
                    {/* {category} */}
                    <div className="lg:w-1/2">
                    <div className="mb-2 block">
                            <Label htmlFor="inputState" value="Book Category" />
                        </div>
                        <Select id="inputState" name="categoryName" className="w-full rounded" value={selectedBookCategory} onChange={handleChangeSelectedValue}>
                            {
                                bookCategories.map((option)=> <option key={option} value={option}>{option}</option>)
                            }
                        </Select>
                    </div>
                </div>

                {/* {book Description} */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookDescription" value="Book Description" />
                </div>
                    <Textarea className="w-full" id="bookDescription" name="bookDescription" placeholder="write your book description" required rows={4} defaultValue={bookDescription} />
            </div>

            {/* {book pdf link} */}
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="bookPDFUrl" value="Book PDF URL" />
                </div>
                    <TextInput id="bookPDFUrl" name="bookPDFUrl" type="text" placeholder="book pdf url" required  defaultValue={bookPDFUrl}/>
            </div>
            <Button type="submit" className="mt-5 text-black bg-blue-700 text-center">Update Book</Button>
            </form>
        </div>
    )
}

export default EditBooks