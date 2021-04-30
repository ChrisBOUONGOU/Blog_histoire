import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { selectUserInput, setBlogData } from '../features/UserSlice';
import { useDispatch } from 'react-redux';

import "../styles/blogs.css";

const Blogs = () =>{

    const searchInput = useSelector(selectUserInput);
    const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&
    token=735f742c6364b51a16e7e60f765eac01`;
    const dispatch = useDispatch();
    const [blogs,setBlogs] = useState();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      axios
      .get(blog_url)
      .then((response) => {
          dispatch(setBlogData(response.data))
          setBlogs(response.data)
          setLoading(false)
      })
      .catch((error) => {
          console.log(error);
      });
    }, [searchInput]);

    return(
     <div className="blogg_page">
         <h1 className="blog__page__header">Blogs</h1>
         {loading ? 
         <h1 className="loading">
           Veillez patientez...
         </h1> : ""}
         <div className="blogs">
            {blogs?.articles?.map(blog => (
               <a className="blog" target="_blank" href={blog.url}>
                   <img src={blog.image} />
                   <div>
                       <h3 className="sourceName">
                           <span>{blog.source.name}</span>
                           <span>{blog.publishedAt}</span>
                       </h3>
                       <h1>{blog.title}</h1>
                       <p>{blog.description}</p>
                   </div>
               </a>
            ))}

            {blogs?.totalArticles == 0 && (
                <h1 className="no_blogs">
                    Pas de blogs disponble 
                </h1>
            )}
         </div>
     </div>
    );
};

export default Blogs;