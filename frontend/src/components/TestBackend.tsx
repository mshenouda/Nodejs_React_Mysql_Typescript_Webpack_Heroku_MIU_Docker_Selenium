import React, { useState, FC, useEffect } from "react";

interface IData {
    readonly id: number,
    title: string,
    description: string,
    published: boolean
}

const TestBackend: React.FC<{}> = () => {

    const [datas, setData] = useState<IData[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/tutorials")
            // fetch("https://jsonplaceholder.typicode.com/posts")
            .then(res => res.json())
            .then(newData => setData((prev) => [...prev, ...newData]))
            .catch(err => console.log(err));
    }, []);


    return (
        <div>
            {datas.map((data, index) => {
                const { id, title, description, published } = data
                return (<ul key={id}>
                    <li>Id: {id}</li>
                    <li>Title: {title}</li>
                    <li>Description: {description}</li>
                    <li>Published: {published ? "Published" : "Not Published"}</li>

                </ul>);
            })}
        </div>);
};


export default TestBackend;