import React, {} from 'react'
import '../styles/Pagination.css';


function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
    
  if(Math.ceil(totalCards / cardPerPage ) < currentPage ) {
    paginate(1)
  }

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / cardPerPage ); i++){
        pageNumbers.push(i);
    }

    return (
        <ul class="paginator">
          {pageNumbers.length > 1 &&
            pageNumbers.map((p, i) =>
              p === currentPage ? (
                <li key={i}>
                  <button className="pag-btn active" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              ) : (
                <li key={i}>
                  <button className="pag-btn" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              )
            )}
        </ul>
    );
}
export default Pagination;