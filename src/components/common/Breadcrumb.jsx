import { Link } from "react-router-dom";
import React from "react";

const Breadcrumb = React.memo(({ items = [] }) => {
    if (!Array.isArray(items) || items.length === 0) return null;

    return (
        <nav
            className="flex px-5 py-3 text-gray-700 bg-gray-50 dark:bg-gray-800 rounded-full"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li key={item.label + index} className="inline-flex items-center">
                            {index === 0 ? (
                                <Link
                                    to={item.to}
                                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white"
                                >
                                    <svg
                                        className="w-3 h-3 me-2.5"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"
                                        />
                                    </svg>
                                    {item.label}
                                </Link>
                            ) : (
                                <div className="flex items-center">
                                    <svg
                                        className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                    {item.to && !isLast ? (
                                        <Link
                                            to={item.to}
                                            className="ms-1 text-sm font-medium text-gray-700 hover:text-black md:ms-2 dark:text-gray-400 dark:hover:text-white"
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <span
                                            className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400"
                                            aria-current={isLast ? "page" : undefined}
                                        >
                                            {item.label}
                                        </span>
                                    )}
                                </div>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
});

export default Breadcrumb;
