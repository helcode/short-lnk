import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchemea from 'simpl-schema';
import shortid from 'shortid';


export const Links = new Mongo.Collection( 'links' );

if ( Meteor.isServer ) {
  Meteor.publish( 'linksPub', function () {
    //note that getting userId from inside pubish function is no
    //supported through normal Meteor.userId() method as per meteor
    //documentation, we will need to use ES5 function () to have
    //access to 'this' binding to be able to use 'this.userId'.
    return Links.find( { userId: this.userId } );
  } );
}

Meteor.methods( {
  'linksMethod.insert' ( url ) {
    if ( !this.userId ) {
      throw new Meteor.Error( 'not-authorized' );
    }

    new SimpleSchemea( {
      url: {
        type: String,
        label: 'Your link', //label will be used to build error messages
        regEx: SimpleSchemea.RegEx.Url
      }
    } ).validate( { url: url } ); //we can use ES6 property shorhand and replace {email:email} with {email}

    Links.insert( {
      _id: shortid.generate(),
      url: url,
      userId: this.userId,
      visible: true,
      visitedCount: 0,
      lastVisitedAt: null
    } );
  },
  'linksMethod.setVisibility' ( _id, visible ) {
    if ( !this.userId ) {
      throw new Meteor.Error( 'not-authorized' );
    }

    new SimpleSchemea( {
      _id: {
        type: String,
        min: 1
      },
      visible: {
        type: Boolean
      }
    } ).validate( { _id, visible } );

    Links.update( { userId: this.userId, _id: _id }, { $set: { visible: visible } } );

  },
  'linksMethod.trackVisit' ( _id ) {
    new SimpleSchemea( {
      _id: {
        type: String,
        min: 1
      }
    } ).validate( { _id } );
    Links.update( { _id }, {
      $set: { lastVisitedAt: new Date().getTime() },
      $inc: { visitedCount: 1 }
    } );
  }
} );
