import axios from "axios"
import { FormEvent, useEffect, useState } from "react"
import Item from "../interfaces/interface"

const Home: React.FC = () => {


    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        getData('', '')
    }, [])



    const getData = async (title: string, description: string) => {
        const res = await axios.get(`https://images-api.nasa.gov/search?q=h&title=${title}&description=${description}`)
        const data = await res.data
        setItems(data.collection.items)
    }

    const [searchBy, setSearchBy] = useState<string>('title')
    const [search, setSearch] = useState<string>('')

    function getAgain(e: FormEvent) {
        e.preventDefault();
        if (searchBy === 'title') {
            getData(search, '')
        } else {
            getData('', search)
        }
    }

    console.log(items);


    return (
        <div className="container mx-auto p-5">
            <form className="form" onSubmit={getAgain}>
                <input type="search" value={search} onChange={(e) => setSearch(e.target.value)} className="border-2 outline-blue-700 hover:border-blue-500 rounded-lg transition duration-500 p-2 w-full" />
                <button className=""></button>
            </form>
            <div className="flex text-white my-5 rounded-lg overflow-hidden">
                <p className="bg-slate-900 p-2">Search By </p>
                <select value={searchBy} className='bg-slate-800 text-white rounded-r-lg' onChange={e => setSearchBy(e.target.value)}>
                    <option value="title">Title</option>
                    <option value="description">Description</option>
                </select>
            </div>

            <div className="md:w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 p-5">
                {
                    items.map((item, i) => {
                        return <div key={i} className='border-2 p-2 rounded-lg grid grid-rows-[1fr_auto] gap-4'>
                            <h1 className="font-mono border-b-2"><span className="font-bold font-serif">Description ) </span> {item.data[0].description.slice(0, 100)}<span>...</span></h1>
                            {/* <p className="bg-gray-700 rounded-lg transition duration-500 text-white absolute">{item.data[0].description}</p> */}
                            <div className="flex gap-10">
                                <img src={item.links && item.links[0].href} className='h-[200px] rounded-xl' alt="" />
                                <div className="font-serif">
                                    <h2 className="font-bold text-2xl">Title : {item.data[0].title}</h2>
                                    <h3>center: {item.data[0].center}</h3>
                                    <h3>Created date : {item.data[0].date_created}</h3>
                                    <h3>Media type : {item.data[0].media_type}</h3>
                                    <h3>NASA ID : {item.data[0].nasa_id}</h3>
                                    <h3>Photographer : {item.data[0].photographer}</h3>
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Home