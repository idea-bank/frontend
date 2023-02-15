import styles from '../styles/feed.module.css';
import { PostModel } from "@/models/PostModel"
import MOCK_DATA from "@/data/MOCK_DATA.json"
import Post from '@/components/post';
import MobileNav from '@/components/MobileNav';
import { useMediaQuery } from '@mui/material';

const getPosts = () : PostModel[] => {
    const postArr : PostModel[] = MOCK_DATA;
   

    return postArr;
}
export default function Feed() {
    const isMobile = useMediaQuery('(min-width:425px)');
                console.log(isMobile);
    return (
        <>
        <div className={styles.feed}>
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