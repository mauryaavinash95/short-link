import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Links } from '../api/links';
import { Meteor } from 'meteor/meteor';
import LinksListItem from './LinksListItem';
import { Session } from 'meteor/session';
import FlipMove from 'react-flip-move';

export default class LinksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            links: [],
        };
    }
    componentDidMount() {
        console.log("componentDidMount");
        this.linksTracker = Tracker.autorun(() => {
            Meteor.subscribe('links');
            let links = Links.find({
                visible: Session.get('showVisible'),
            }).fetch();
            this.setState({ links });
        });
    }
    componentWillUnmount() {
        console.log("ComponentWillUnmount Linkslist");
        this.linksTracker.stop();
    }
    renderLinksListItems() {
        let links = this.state.links;
        if (links.length < 1) {
            return (
                <div className="item">
                    <p className="item__status-message"> No Links Found. </p>
                </div>
            )
        }
        return (links.map((link) => {
            const shorturl = Meteor.absoluteUrl(link._id);
            return <LinksListItem key={link._id} {...link} shorturl={shorturl} />;
        }));
    }
    render() {
        return (
            <div>
                <FlipMove maintainContainerHeight={true}>
                    {this.renderLinksListItems()}
                </FlipMove>
            </div>
        );
    }
}