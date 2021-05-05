import { useContext, useState } from 'react';
import { DataContext } from '../Main/Main';

export default function Bookmark({ data }) {
    const { deleteBookmark, updatedBookmark } = useContext(DataContext);
    const [theTitle, setTheTitle] = useState(data.title);
    const [theUrl, setTheUrl] = useState(data.url);

    const onTheTitleChange = (e) => setTheTitle(e.target.value);
    const onTheUrlChange = (e) => setTheUrl(e.target.value);

    const onFormSubmit = (e) => {
        e.preventDefault();
        const theData = { title: theTitle, url: theUrl }
        updatedBookmark(theData, data._id)
    }

    return (
        <div>
            <a href={data.url} target="_blank">
                <h3>{data.title}</h3>
            </a>
            <button onClick={(e) => deleteBookmark(data._id)}>Delete</button>
            <div>
                <form onSubmit={onFormSubmit}>
                    <input type="text" id="title" placeholder="title" onChange={onTheTitleChange} value={theTitle} />
                    <input type="text" id="url" placeholder="url" onChange={onTheUrlChange} value={theUrl} />
                    <input type="submit" />
                </form>
            </div>
        </div>
    )
}