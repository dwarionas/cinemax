import { IBookmark } from "../../types";

interface IProps {
    bookmark: any;
    setBookmarks: any;
    type: string;
    id: number;
    dispatch: any;
    userID: string;
}


export const createBookmark = (props: IProps) => {
    const { bookmark, setBookmarks, type, id, dispatch, userID } = props;

    bookmark({
        variables: {
            input: {
                type,
                id,
                userID
            }
        }
    }).then((data: { data: { addBookmark: IBookmark } }) => dispatch(setBookmarks(data.data.addBookmark)))
}