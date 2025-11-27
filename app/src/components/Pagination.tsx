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

    // Show at most 5 numeric buttons centered around the current page when possible.
    const WINDOW = 10;
    let start = Math.max(1, currentPage - Math.floor(WINDOW / 2));
    let end = start + WINDOW - 1;
    if (end > maxPage) {
        end = maxPage;
        start = Math.max(1, end - WINDOW + 1);
    }
    const pages = Array.from({length: end - start + 1}, (_, i) => start + i);

    return (
        <nav aria-label="Pagination">
            <ul className="pagination mb-0">
                {/* First button */}
                <li className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                    aria-disabled={currentPage === 1 || undefined}>
                    <Link className="page-link" href={makeHref(1)} aria-label="First">
                        First
                    </Link>
                </li>
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
                {/* Last button */}
                <li className={`page-item${currentPage === maxPage ? " disabled" : ""}`}
                    aria-disabled={currentPage === maxPage || undefined}>
                    <Link className="page-link" href={makeHref(maxPage)} aria-label="Last">
                        Last
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
