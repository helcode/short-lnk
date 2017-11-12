import React from 'react';
import FlipMove from 'react-flip-move';

import {Meteor} from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';
import { Session } from 'meteor/session';

import {Links} from '../api/links';
import LinksListItem from './LinksListItem';

export default class LinksList extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      links: []
    };
  }
  componentDidMount () {
    //console.log('componentDidMonut LinksList');
    this.linksTracker = Tracker.autorun( () => {
      Meteor.subscribe('linksPub');
      const links = Links.find({
        visible: Session.get('showVisible')
      }).fetch();
      this.setState({links});
    } );
  }

  componentWillUnmount () {
    //console.log('componentWillUnmount LinksList');
    this.linksTracker.stop();
  }

  renderLinksListItems() {
    //debugger;
    if (this.state.links.length === 0) {
      return (
        <div className="item">
          <p className="item__status-message">No Links Found!</p>
        </div>
      );
    } else {
      return this.state.links.map((link) =>{
        const shortUrl = Meteor.absoluteUrl(link._id);
        return <LinksListItem key={link._id} shortUrl={shortUrl} {...link}/>;
        //...link (spread operator) is a way to break the link object
        //into its components and pass it as props (hence, istead of using
        //this.props.link.userId, we can use this.props.userId ...etc.)
        //OLD Line,
        //return <p key={link._id}>{link.url}</p>;
      });
    }
  }

  render () {
    return (
      <div>
        <FlipMove maintainContainerHeight={true}>
          {this.renderLinksListItems()}
        </FlipMove>
      </div>
    );
  }
}
