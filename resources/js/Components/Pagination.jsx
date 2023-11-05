import { Link } from '@inertiajs/react'

export default function Pagination({
    pages
}) {
    return (
        <div className="w-full flex justify-center">
            {pages[0].url &&
                <Link className="flex items-center px-4 py-2 rounded-lg border-2 border-black" href={pages[0].url}>
                    <div>
                        &laquo;
                    </div>
                </Link>
            }
            <div className="mx-4 flex flex-wrap gap-4">
                {pages.slice(1, -1).map((page, index) => (
                    <Link key={index} className={`block px-4 py-2 rounded-lg border-2 border-black ${page.active ? "bg-blue-200" : "bg-white"}`} href={page.url}>
                        {page.label}
                    </Link>
                ))}
            </div>
            {pages[pages.length - 1].url &&
                <Link className="flex items-center px-4 py-2 rounded-lg border-2 border-black" href={pages[pages.length - 1].url}>
                    <div>
                        &raquo;
                    </div>
                </Link>
            }
        </div>
    );
}
