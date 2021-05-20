import Bookmark from "../Bookmarks";

export default function BookmarksList({ data }) {
	return (
		<div>
			<h2>Saved Bookmarks</h2>
			{data.map((el, i) => {
				return <Bookmark data={el} />;
			})}
		</div>
	);
}
