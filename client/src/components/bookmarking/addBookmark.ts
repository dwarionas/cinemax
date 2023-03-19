import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client";
import { ActionCreatorWithPayload, AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { IBookmark } from "../../types";

interface IProps extends IBookmark {
    bookmark: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => void;
    setBookmarks: ActionCreatorWithPayload<IBookmark, "auth/setBookmarks">;
    dispatch: ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction>;
    userID: string;
}


export const createBookmark = (props: IProps) => {
    const { bookmark, setBookmarks, dispatch } = props;

    bookmark({
        variables: {
            input: {
                userID: props.userID,
                name: props.name,
                poster_path: props.poster_path,
                first_air_date: props.first_air_date,
                release_date: props.release_date,
                id: props.id,
                title: props.title
            }
        },
        onCompleted: ({ addBookmark }) => dispatch(setBookmarks(addBookmark))
    })
}