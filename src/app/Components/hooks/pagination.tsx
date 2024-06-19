import React from 'react';
import { usePagination, DOTS } from './usePagination';

const Pagination = (props: any) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
  } = props;

  const paginationRange:any = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className='flex my-8 w-full h-[50px] -rotate-[0.5deg] justify-between '>
      <li onClick={onPrevious}>
        <svg className={`${currentPage === 1 ? "hidden": "pointer-events-none"} rotate-180 hover:cursor-pointer fill-[#9E52F2] opacity-85`} xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </li>
      {paginationRange.map((pageNumber :any) => {
        if (pageNumber === DOTS) {
          return <li key="">&#8230;</li>;
        }

        return (
          <li key="" className='hover:cursor-pointer hover:text-[#7246DF] hover:opacity-70' onClick={() => onPageChange(pageNumber)}>
            {pageNumber}
          </li>
        );
      })}
      <li onClick={onNext}>
        <svg className={`${currentPage === lastPage ? "hidden": "pointer-events-none"}  hover:cursor-pointer fill-[#9E52F2] opacity-85`} xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M7.293 4.707 14.586 12l-7.293 7.293 1.414 1.414L17.414 12 8.707 3.293 7.293 4.707z"/></svg>
      </li>
    </ul>
  );
};

export default Pagination;
