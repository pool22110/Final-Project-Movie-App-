
import styles from './moviecard.module.css'
import React from 'react'; 
import { Card } from 'primereact/card';
import { Rating } from "primereact/rating"
import { Button } from 'primereact/button';

export default function MovieCard({movie}) {
    const header = (
        <img alt={movie.title} src={movie.image} width={200}
        height={400} />
    );


    return (
        <div className={styles.card}>
            
            <Card title={movie.title}  header={header} className="md:w-25rem">
                <div className='content'>
                    <hr/>

                     <div className="card flex justify-content-center">
                            <Rating value={movie.rating} readOnly cancel={false} />
                    </div>
                    
                    <div className="pi pi-stopwatch  card flex justify-content-end">{movie.movie_length} mins</div>
                </div>
            </Card>
        </div>
    )
}
        