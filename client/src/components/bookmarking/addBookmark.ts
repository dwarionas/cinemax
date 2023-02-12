// import { useMutation } from '@apollo/client';
// import { useSelector } from "react-redux";
// import { useAppDispatch, RootState } from "../../redux/store";
// import addBookmark from '../../graphql/mutations/bookmarking/addBookmark.graphql';
// import { setBookmarks } from '../../redux/slices/authSlice';

// const [bookmark] = useMutation(addBookmark);

// export const createBookmark = (type: string, id: number) => {
//     const dispatch = useAppDispatch();
//     const userID = useSelector((state: RootState) => state.auth.user.id)

//     bookmark({
//         variables: {
//             input: {
//                 type,
//                 id,
//                 userID
//             }
//         }
//     }).then(({ data }) => dispatch(setBookmarks(data)))
// }
export const mauna = () => { };