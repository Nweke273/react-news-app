import {Link} from "react-router-dom";


export default function ArticleCard({article}){
    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-3">
            <div className="px-4 py-5 sm:px-6">
                {/* <img src={"https://c.ndtvimg.com/2023-10/86i1skog_israel-military-_625x300_11_October_23.jpg"} className={"sm:rounded-t-lg max-h-[180px] w-full"}  alt={article?.title}/> */}
            </div>
            <div className="border-t border-gray-200">
                <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:px-6">
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">{article?.source?.name ?? article?.source ?? article?.pillarName ?? ""}</p>
                        <Link to={article?.url ?? article?.web_url ?? article?.webUrl} target={"_blank"} className={"text-lg leading-6 font-medium text-gray-900 hover:text-blue-700 line-clamp-2"}>{article?.title ?? article?.abstract ?? article?.webTitle}</Link>
                    </div>
                </dl>
            </div>
        </div>
    )
}