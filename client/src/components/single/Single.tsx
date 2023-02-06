import React from 'react'
import { useParams } from 'react-router'

const Single = () => {
    const params = useParams();

    return (
        <div>{params.id}</div>
    )
}

export default Single