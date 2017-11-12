import React from 'react';
import PropTypes from 'prop-types';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader';
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters';

// Statless Functional Component
export default () => {
  return (
    <div>
      <PrivateHeader title="Short Lnk"/>
      <div className="page-content">
        <LinksListFilters/>
        <AddLink/>
        <LinksList/>
      </div>
    </div>
  );
};

// // ES6 based Containert Component,
// export default class Link extends React.Component {
//   render() {
//     return (
//       <div>
//         <PrivateHeader title="Your Links"/>
//         <LinksList/>
//         <AddLink/>
//       </div>
//     );
//   }
// }
