
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
    // const footer = (
    //     <div className="flex flex-wrap justify-content-end gap-2">
    //         <Button label="Save" icon="pi pi-check" />
    //         <Button label="Cancel" icon="pi pi-times" className="p-button-outlined p-button-secondary" />
    //     </div>
    // );

    return (
        <div className={styles.card}>
            
            <Card title={movie.title}  /*(footer={footer}*/ header={header} className="md:w-25rem">
                <div className='content'>
                    <hr/>
                    {/* <div className='ratings'>

                        <span>{movie.rating}</span>
                    </div> */}
                     <div className="card flex justify-content-center">
                            <Rating value={movie.rating} readOnly cancel={false} />
                    </div>
                    
                    <div className="pi pi-stopwatch  card flex justify-content-end">{movie.movie_length} mins</div>
                </div>
            </Card>
        </div>
    )
}
        