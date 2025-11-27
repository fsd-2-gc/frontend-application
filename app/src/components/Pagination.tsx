"use client";

import Link from "next/link";
import {usePathname, useSearchParams} from "next/navigation";

type Props = {
    currentPage: number;
    maxPage: number;
};

/**
 * Bootstrap-styled pagination component with number-only buttons.
 * - Accepts currentPage and maxPage.
 * - Renders 1..maxPage buttons.
 * - Updates the ?page= query param while preserving other params.
 */
export default function Pagination({currentPage, maxPage}: Props) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (!Number.isFinite(currentPage) || currentPage < 1) currentPage = 1;
    if (!Number.isFinite(maxPage) || maxPage < 1) return null;

    const makeHref = (page: number) => {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("page", String(page));
        return `${pathname}?${params.toString()}`;
    };

    const pages = Array.from({length: maxPage}, (_, i) => i + 1);

    return (
        <nav aria-label="Pagination">
            <ul className="pagination mb-0">
                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item${page === currentPage ? " active" : ""}`}
                        aria-current={page === currentPage ? "page" : undefined}
                    >
                        <Link className="page-link" href={makeHref(page)}>
                            {page}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
