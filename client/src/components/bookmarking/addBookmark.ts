import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client";
import { ActionCreatorWithPayload, AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { IBookmark } from "../../types";

interface IProps {
    bookmark: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => void;
    setBookmarks: ActionCreatorWithPayload<IBookmark, "auth/setBookmarks">;
    type: string;
    id: number;
    dispatch: ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction>;
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
        },
        onCompleted: ({ addBookmark }) => dispatch(setBookmarks(addBookmark))
    })
}