import { useState } from "react";


const Pagination = ({ nPages, setCurrentPage }: any) => {

  const [actualPage, setActualPage] = useState<number>(1);

  const handlePagination=(index:number)=>{
    setCurrentPage(index);
    setActualPage(index);
  };

  return (<div className="my-3">
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a className={actualPage === 1 ? "page-link disabled" : "page-link"} onClick={()=>handlePagination(actualPage-1)}>Previous</a>
        </li>
        {[...Array(nPages)].map((page, index) =>
          <>
            <li className={index+1 === actualPage ? "page-item active" : "page-item"}><a className="page-link" onClick={()=>handlePagination(index+1)}>{index+1}</a></li>
          </>
        )}

        <li className="page-item">
          <a className={actualPage < nPages ? "page-link" : "page-link disabled"} onClick={()=>handlePagination(actualPage+1)}>Next</a>
        </li>
      </ul>
    </nav>

  </div>)
}

export default Pagination;