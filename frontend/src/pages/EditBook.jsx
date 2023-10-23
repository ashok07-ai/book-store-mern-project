import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'

const EditBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setpublishYear] = useState('')
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        setloading(true);
        axios.get(`http://localhost:5000/books/${id}`).then((response) => {
            setAuthor(response.data.author)
            setTitle(response.data.title)
            setpublishYear(response.data.publishYear)
            setloading(false)
        })
    }, [])
    const handleEditBook = () => {
        const data = {
            title,
            author,
            publishYear,
        }
        setloading(true)
        axios
            .put(`http://localhost:5000/books/${id}`, data)
            .then(() => {
                setloading(false)
                enqueueSnackbar('Book Updated Successfully!!', { variant: 'success' })

                navigate('/')
            })
            .catch(() => {
                setloading(false)
                enqueueSnackbar('Error!!', { variant: 'error' })
            })
    }
    return (
        <div className="p-4">
            <BackButton />
            <h2 className="text-3xl my-4">Create Book</h2>
            {loading ? <Spinner /> : ''}

            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border-2 borer-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Author</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className="border-2 borer-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="my-4">
                    <label className="text-xl mr-4 text-gray-500">Publish Year</label>
                    <input
                        type="number"
                        value={publishYear}
                        onChange={(e) => setpublishYear(e.target.value)}
                        className="border-2 borer-gray-500 px-4 py-2 w-full"
                    />
                </div>

                <div className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
                    Save
                </div>
            </div>
        </div>
    )
}

export default EditBook
