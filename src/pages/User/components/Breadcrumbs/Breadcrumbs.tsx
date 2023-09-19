import * as React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import BreadcrumbsUI from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

import { getMonthNameByIndex } from '../../../../utils';

import { useStyles } from './styles';

const renderLink = (path: string, label: string, onClick: () => void, last = false) => {
  let finalLabel = label;

  if (label.startsWith('year-')) {
    finalLabel = label.substring(5, label.length);
  } else if (label.startsWith('month-')) {
    const month = label.substring(6, label.length);
    finalLabel = getMonthNameByIndex(month);
  }

  if (last) {
    return (
      <Typography
        key={finalLabel}
        color="textPrimary"
      >
        {finalLabel}
      </Typography>
    );
  }
  return (
    <Link
      key={path}
      color="inherit"
      href={path}
      onClick={onClick}
    >
      {finalLabel}
    </Link>
  );
}

const renderBreadcrumbs = (chunks: string[], getClickHandler: (path: string) => () => void) => {
  return chunks.map((chunk, index) => {
    const fullPath = chunks
      .slice(0, index + 1)
      .reduce((acc, value, sliceIndex) => {
        return acc += `${value}${sliceIndex < index ? '/' : ''}`;
      }, '');
    const handler = getClickHandler(fullPath);
    const isLast = index === chunks.length - 1;

    return renderLink(fullPath, chunk, handler, isLast);
  });
}

export const Breadcrumbs: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const chunks = location.pathname.split('/');

  const getBreadcrumbClickHandler = React.useCallback((path: string) => () => {
    history.push(path);
  }, [history]);

  return (
    <div className={classes.wrapper}>
      <BreadcrumbsUI aria-label="breadcrumb">
        {renderBreadcrumbs(chunks, getBreadcrumbClickHandler)}
      </BreadcrumbsUI>
    </div>
  );
}