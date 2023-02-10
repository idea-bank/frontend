import styles from '../styles/feed.module.css';

type Post = {
    id : number;
}

const getFeed = () => {
    const postArr : Post[] = Array.from({ length: 100 }, (_, i) => ({ id: i + 1 }));;
    return postArr;
}
const colors = [
    "#F44336", 
    "#3F51B5", 
    "#2196F3", 
    "#03A9F4", 
    "#00BCD4", 
    "#009688", 
    "#4CAF50", 
    "#8BC34A", 
    "#CDDC39", 
    "#FFC107", 
    "#FF9800", 
    "#FF5722", 
];

export default function Feed() {
    return (
        <div className={styles.feed}>
            { getFeed().map((post, index)=>{
                return <div className={styles.post} 
                key={index}
                style={{backgroundColor : colors[Math.floor(Math.random() * colors.length)]}}>Post {post.id}
                </div>
            })}
        </div>
  )
}