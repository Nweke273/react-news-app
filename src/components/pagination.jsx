

export default function Pagination({links, handlePageChange}){
    return <>
        {links.map((link, key) => (
            <button
                key={key}
                onClick={() => handlePageChange(link.url)}
                disabled={!link.url}
                className={`ml-2 first:ml-0 sm:first:ml-2 border inline-flex justify-between relative items-center py-2 px-3 shadow-sm rounded-lg text-center text-base font-medium leading-5 text-gray-600 outline-none ${link.active ? "bg-gray-800 border border-transparent text-white" : ""}`}
            >
                <div dangerouslySetInnerHTML={{ __html: link.label }} />
            </button>
        ))}
    </>
}