
import React from 'react'

export default function Moviedetailpanel({movie}) {
  return (
    <div>
      <section>
        <div>
          <h3>{movie.title}</h3>
          <p>
            {movie.language}
          </p>
        </div>
        <div>
          <p>
            {movie.genre}
          </p>
          <p>{movie.release_date}</p>
        </div>
      </section>
    </div>
  )
}

