import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import BackButton from '../components/BackButton'


export default function CreateMacro() {
    const [blockNumber, setBlockNumber] = useState(0)
    const navigate = useNavigate()
    const { id } = useParams() 

    
    const handleSubmit = () => {

        const block = {
            macroCycleId: id,
            blockNumber
        }

        axios
            .post('http://localhost:5000/blocks', block)
            .then(() => {
                navigate(-1)
            })
            .catch((error) => {
                console.log(error)
            })
    }

  return (
    <div>
        <div className="flex items-center justify-center">
            <h1 className='my-4 mr-4 text-3xl border border-black rounded text-center w-[200px]'>Create Block</h1>
            <div className="fixed top-0 right-0 p-4">
                <BackButton destination={`/${id}/Blocks`}/>
            </div>
        </div>

        <div className="flex flex-col border-sky-400 rounded-x1 w-[600px] mx-auto text-center ">

            <div className="my-4">
            <label className='text-xl mr-4 text-gray-4'>Block #</label>
            <input 
                type='text'
                value={blockNumber ? blockNumber : ''}
                onChange={(e) => setBlockNumber(e.target.value) }
                className='border-2 border-gray-500 px-4 my-4 py-2 w-full'
            />
            </div>

            <button className='p-2 bg-sky-300 m-8 rounded' onClick={handleSubmit}>
                Generate Macro Cycle
            </button>

        </div>

    </div>
  )
}
