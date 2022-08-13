import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewCommentForm from "./NewCommentForm";
import CommentsList from "./CommentsList";
import useHttp from "../../hooks/use-http";
import { getAllComments } from "../../lib/api";
import classes from "./Comments.module.css";
import LoadingSpinner from "../UI/LoadingSpinner";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();

  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);
  const quoteId = params.quoteId;

  useEffect(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const CommentAdded = useCallback(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  let comments;

  if (status === "pending") {
    comments = (
      <div className={classes.centered}>
        <LoadingSpinner />
      </div>
    );
  }
  if (status === "completed" && loadedComments && loadedComments.length > 0) {
    comments = <CommentsList comment={loadedComments} />;
  }

  if (
    status === "completed" &&
    (!loadedComments || loadedComments.length === 0)
  ) {
    comments = <p className={classes.centered}>No Comments Found</p>;
  }
  return (
    <section className={classes.comments}>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm quoteId={quoteId} onAddedComment={CommentAdded} />
      )}
      {comments}
    </section>
  );
};

export default Comments;
