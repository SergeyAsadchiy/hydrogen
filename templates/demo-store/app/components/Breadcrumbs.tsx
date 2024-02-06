import React from 'react';
import {Link, useMatches} from '@remix-run/react';

const SEPARATOR = '/';

export function Breadcrumbs() {
  const matches = useMatches();
  const deepestRoute = matches.at(-1);
  const splitURL = deepestRoute?.pathname.split('/') || [];
  const pages = [{path: '/', name: 'Home'}];
  let hideBreadcrumbs = true;

  if (splitURL[1]) {
    switch (splitURL[1]) {
      case 'collections':
        hideBreadcrumbs = false;
        pages.push({
          path: '/collections',
          name: 'Collections',
        });

        if (splitURL[2]) {
          pages.push({
            path: deepestRoute?.path || '',
            name: `${deepestRoute?.data?.collection?.title || ''}`,
          });
        }
        break;

      case 'products':
        hideBreadcrumbs = false;
        pages.push({
          path: '/products',
          name: 'Products',
        });
        if (splitURL[2]) {
          pages.push({
            path: deepestRoute?.path || '',
            name: deepestRoute?.data?.product?.title || '',
          });
        }
        break;

      default:
        hideBreadcrumbs = true;
        pages.push({
          path: `/${splitURL[1]}`,
          name: splitURL[1].charAt(0).toUpperCase() + splitURL[1].slice(1),
        });
    }
  }

  if (hideBreadcrumbs) return null;

  return (
    <nav className="text-sm px-12 py-1">
      <ol className="flex items-center">
        {pages.map((page, index) => {
          const currentPage = index === pages.length - 1;
          return (
            <li className="flex items-center" key={`${page.path}_${index}`}>
              {index !== 0 ? (
                <span className="px-2 text-primary/80 hover:text-primary">
                  {SEPARATOR}
                </span>
              ) : null}
              {currentPage ? (
                <span className="text-primary/80">{page.name}</span>
              ) : (
                <span className="text-primary/70 hover:text-primary">
                  <Link to={page.path}>{page.name}</Link>
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
