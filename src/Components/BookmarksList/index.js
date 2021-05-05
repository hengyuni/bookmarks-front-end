import Bookmark from '../Bookmarks';

export default function BookmarksList({ data }) {
    return (
        <div>
            <h2>List of all bookmarks</h2>
            {data.map((el, i) => {
                return <Bookmark data={el} />
            })}
        </div>
    )
}