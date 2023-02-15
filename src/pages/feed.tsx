import styles from '../styles/feed.module.css';
import { PostModel } from "@/models/PostModel"
import MOCK_DATA from "@/data/MOCK_DATA.json"
import Post from '@/components/post';
import MobileNav from '@/components/MobileNav';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';

const getPosts = () : PostModel[] => {
    const postArr : PostModel[] = MOCK_DATA;
   

    return postArr;
}
export default function Feed() {
    const isMobile = useMediaQuery('(min-width:425px)');
    const [height, setHeight] = useState(0);
    useEffect(() => {
      function handleResize() {
        setHeight(window.innerHeight);
      }
      handleResize(); 
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    return (
        <>
        <div className={styles.feed} style={{height :height}}>
            { getPosts().map((post : PostModel, index)=>{
                return <Post 
                post={post}
                key={index}
                />   
            })}
        </div>
        {
            !isMobile ? <MobileNav></MobileNav> : <></>
        }
        </>
  )
}