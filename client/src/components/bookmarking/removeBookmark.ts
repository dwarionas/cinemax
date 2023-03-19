import { ApolloCache, DefaultContext, MutationFunctionOptions, OperationVariables } from "@apollo/client";
import { ActionCreatorWithPayload, AnyAction, Dispatch, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";

interface IProps {
    bookmarkID: string;
    userID: string;
    throwBookmark: (options?: MutationFunctionOptions<any, OperationVariables, DefaultContext, ApolloCache<any>> | undefined) => void;
    removeBookmarks: ActionCreatorWithPayload<string, "auth/removeBookmarks">;
    dispatch: ThunkDispatch<RootState, undefined, AnyAction> & Dispatch<AnyAction>;
}

export const deleteBookmark = (props: IProps) => {
    const { throwBookmark, dispatch, removeBookmarks, bookmarkID, userID } = props;

    throwBookmark({
        variables: {
            bookmarkID,
            userID
        },
        onCompleted: () => dispatch(removeBookmarks(bookmarkID))
    })
}