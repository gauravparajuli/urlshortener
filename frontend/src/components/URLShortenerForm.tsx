import axios from 'axios'
import { useState, useRef } from 'react'
import { SERVER_ENDPOINTS } from '../config'
import './URLShortenerForm.css'
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'
import CopyToClipboard from 'react-copy-to-clipboard'
import toast, { Toaster } from 'react-hot-toast'

function URLShortenerForm() {
    const [destination, setDestination] = useState()
    const divRef = useRef<HTMLAnchorElement>(null)
    const [shortUrl, setShortUrl] = useState<{
        shortId: string
    } | null>(null)

    console.log(SERVER_ENDPOINTS)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setShortUrl(null)
        const result = await axios
            .post(`${SERVER_ENDPOINTS}/shorten`, {
                destination,
            })
            .then((resp) => resp.data)
            .catch((err) => {
                toast.error('Please enter a valid url.')
            })
        console.log(result)
        setShortUrl(result)
    }
    var finalURL = `${window.location.origin}/${shortUrl?.shortId}`
    const text = () => {
        toast.success('Copied!')
    }

    return (
        <>
            <div className='outer'>
                <div>
                    <Toaster />
                </div>
                <div className='head-div'>
                    <p className='head'>
                        Sajilo <span>URL Shortener</span>
                    </p>
                </div>
                <div className='outer'>
                    <form className='form' onSubmit={handleSubmit}>
                        <input
                            className='input'
                            placeholder='Enter a URL'
                            onChange={(e: any) =>
                                setDestination(e.target.value)
                            }
                        />
                        <button type='submit' className='button'>
                            Create!
                        </button>
                    </form>
                </div>

                {shortUrl && (
                    <div className='link-div'>
                        <p className='link'>
                            <span>
                                <a
                                    href={`/${shortUrl?.shortId}`}
                                    target='_blank'
                                    rel='noreferrer'
                                    ref={divRef}
                                >
                                    {window.location.origin}/{shortUrl?.shortId}
                                </a>
                            </span>
                        </p>
                        <CopyToClipboard text={finalURL}>
                            <ContentCopyRoundedIcon
                                className='copyBtn'
                                onClick={text}
                            />
                        </CopyToClipboard>
                    </div>
                )}
            </div>
        </>
    )
}

export default URLShortenerForm
