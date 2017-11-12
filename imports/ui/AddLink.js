import React from 'react';
import Modal from 'react-modal';

import { Meteor } from 'meteor/meteor';

export default class AddLink extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      url: '',
      isOpen: false,
      error: ''
    };
  }

  onSubmit( e ) {
    //const url = this.state.url;  //ES5 style
    const { url } = this.state; //ES6 style for above line

    e.preventDefault();


    Meteor.call( 'linksMethod.insert', url, ( err, res ) => {
      if ( !err ) {
        this.handleModalClose();
      } else {
        this.setState( { error: err.reason } );
      }
    } );
    //Links.insert( { url, userId: Meteor.userId() } );
    this.refs.url.value = '';

  }

  onChange( e ) {
    this.setState( {
      url: e.target.value.trim()
    } );
  }
  handleModalClose() {
    this.setState( {
      isOpen: false,
      url: '',
      error: ''
    } );
  }


  render() {
    return (
      <div>
        <button className="button" onClick={() => this.setState({isOpen: true})}>+Add Link</button>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel="Add Link"
          onAfterOpen={() => this.refs.url.focus()}
          onRequestClose={this.handleModalClose.bind(this)}
          className="boxed-view__box"
          overlayClassName="boxed-view boxed-view--modal"
        >
          <h1>Add Link</h1>
          {this.state.error ? <p>{this.state.error}</p> : undefined}
          <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)}>
            <input
              type = "text"
              ref="url"
              placeholder="URL"
              value={this.state.url}
              onChange={this.onChange.bind(this)}/>
            <button className="button">Add Link</button>
            <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
            {/*notice that the above button is type="button" to tell the form that this is not a submit button, but just a button that do something else. Without this type statement, pressing "Cancel" button will haev submit+cancel effect  */}
          </form>
        </Modal>
      </div>
    );
  }
}
