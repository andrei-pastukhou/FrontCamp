import React from "react";

const PostItem = ({item}) => {
    return (
        <div>
            <h3>{item.author}</h3>
            <pre>{item.text}</pre>
        </div>
    );
}

export default PostItem;
