export const paginate = (data: any[], currentPage: number, itemsPerPage: number) => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedData = data.slice(start, end);
  
    const totalPages = Math.ceil(data.length / itemsPerPage);
  
    return {
      paginatedData,
      totalPages,
    };
  };
  